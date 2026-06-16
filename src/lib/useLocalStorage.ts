"use client";

import { useEffect, useState } from "react";

// Persiste un estado en localStorage. Inicializa de forma perezosa leyendo el
// valor guardado (con guarda de SSR) y lo reescribe cuando cambia. Evita
// setState dentro de efectos para no disparar renders en cascada.
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => readStorage(key, initial));

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage lleno o no disponible; ignorar.
    }
  }, [key, value]);

  return [value, setValue] as const;
}

function readStorage<T>(key: string, initial: T): T {
  if (typeof window === "undefined") return initial;
  try {
    const raw = window.localStorage.getItem(key);
    return raw != null ? (JSON.parse(raw) as T) : initial;
  } catch {
    return initial;
  }
}
