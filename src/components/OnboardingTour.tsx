"use client";

import { useEffect, useRef } from "react";
import { LifeBuoy } from "lucide-react";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";

const STORAGE_KEY = "dpac.onboarded.v1";

const STEPS = [
  {
    element: ".sideNav",
    popover: {
      title: "Tus 4 herramientas",
      description:
        "Draft, Patch Coach, Vision Coach y Replay Analysis. Cambia de modo desde aquí en cualquier momento.",
    },
  },
  {
    element: "[data-tour='draft-inputs']",
    popover: {
      title: "Todo es editable",
      description:
        "Cambia tu rol, rango, estilo y marca tus héroes. No es una pantalla fija: cada cambio reconfigura la recomendación.",
    },
  },
  {
    element: ".heroGrid",
    popover: {
      title: "Tu pool de héroes",
      description: "Marca los que dominas. El motor solo recomienda picks de aquí.",
    },
  },
  {
    element: "[data-tour='draft-result']",
    popover: {
      title: "Análisis en vivo",
      description:
        "El pick recomendado se recalcula solo, en tiempo real, cada vez que tocas algo a la izquierda. Abre el desglose para ver el radar y el porqué.",
    },
  },
];

/**
 * Onboarding guiado con driver.js. Corre una sola vez (flag en localStorage) y
 * puede relanzarse con el botón "¿Cómo funciona?". driver.js es agnóstico al
 * framework, así que funciona sin problemas en React 19.
 */
export function OnboardingTour({ onStart }: { onStart?: () => void }) {
  const autoRan = useRef(false);

  const run = () => {
    onStart?.();
    // Deja que el tab Draft monte antes de resaltar sus elementos.
    setTimeout(() => {
      const tour = driver({
        showProgress: true,
        overlayColor: "#04060a",
        overlayOpacity: 0.72,
        nextBtnText: "Siguiente",
        prevBtnText: "Atrás",
        doneBtnText: "¡Listo!",
        progressText: "{{current}} de {{total}}",
        steps: STEPS,
      });
      tour.drive();
    }, 80);
  };

  useEffect(() => {
    if (autoRan.current) return;
    autoRan.current = true;
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;
    localStorage.setItem(STORAGE_KEY, "1");
    const timer = setTimeout(run, 900);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button type="button" className="howItWorksBtn" onClick={run}>
      <LifeBuoy size={14} />
      ¿Cómo funciona?
    </button>
  );
}
