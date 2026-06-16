"use client";

import { useEffect, useState } from "react";
import { LogOut, User } from "lucide-react";
import { toast } from "sonner";
import { track } from "@/lib/analytics";

export type SteamUser = {
  steamId64: string;
  accountId: number;
  name?: string;
  avatar?: string;
};

/**
 * Botón de "Entrar con Steam" / tarjeta del usuario logueado en el header.
 * Al cargar consulta /api/auth/me y avisa a la app (onUser) para autorrellenar
 * el Account ID del jugador en el análisis de replays.
 */
export function SteamAuth({ onUser }: { onUser?: (user: SteamUser | null) => void }) {
  const [user, setUser] = useState<SteamUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d: { user: SteamUser | null }) => {
        if (!active) return;
        setUser(d.user);
        onUser?.(d.user);
      })
      .catch(() => {})
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    onUser?.(null);
    toast.success("Sesión cerrada.");
  };

  if (loading) {
    return <span className="steamAuthPlaceholder" aria-hidden="true" />;
  }

  if (user) {
    return (
      <span className="steamUserChip">
        {user.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="steamUserAvatar" src={user.avatar} alt="" width={22} height={22} />
        ) : (
          <User size={16} className="steamUserAvatarFallback" />
        )}
        <span className="steamUserName">{user.name ?? `ID ${user.accountId}`}</span>
        <button type="button" className="steamLogoutBtn" onClick={logout} aria-label="Cerrar sesión">
          <LogOut size={13} />
        </button>
      </span>
    );
  }

  return (
    <a className="steamLoginBtn" href="/api/auth/steam/login" onClick={() => track("Login Steam")}>
      <SteamGlyph />
      Entrar con Steam
    </a>
  );
}

function SteamGlyph() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M11.98 0C5.66 0 .49 4.87.02 11.06l6.44 2.66a3.4 3.4 0 0 1 1.92-.59l2.86-4.15v-.06a4.53 4.53 0 1 1 4.53 4.53h-.1l-4.09 2.92c0 .05.01.1.01.15a3.41 3.41 0 1 1-6.78-.55L.13 14.27A12 12 0 1 0 11.98 0zM7.54 18.21l-1.47-.61a2.57 2.57 0 0 0 4.74-.31 2.56 2.56 0 0 0-3.36-3.36l1.52.63a1.89 1.89 0 1 1-1.43 3.5l-.5.15zm9.97-9.3a3.02 3.02 0 1 0-6.04 0 3.02 3.02 0 0 0 6.04 0zm-5.28 0a2.27 2.27 0 1 1 4.53 0 2.27 2.27 0 0 1-4.53 0z" />
    </svg>
  );
}
