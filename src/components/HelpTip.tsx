"use client";

import { useId, useState } from "react";
import { HelpCircle } from "lucide-react";

/**
 * Icono "?" con una explicación corta. Aparece al pasar el cursor o al enfocar
 * con teclado (accesible), y se cierra con Escape. Sin dependencias: el proyecto
 * no usa Tailwind, así que evitamos arrastrar Radix/shadcn solo para esto.
 */
export function HelpTip({ text, label = "Más información" }: { text: string; label?: string }) {
  const [open, setOpen] = useState(false);
  const id = useId();

  return (
    <span className="helpTip">
      <button
        type="button"
        className="helpTipBtn"
        aria-label={label}
        aria-describedby={open ? id : undefined}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        onFocus={() => setOpen(true)}
        onBlur={() => setOpen(false)}
        onKeyDown={(e) => {
          if (e.key === "Escape") setOpen(false);
        }}
      >
        <HelpCircle size={13} />
      </button>
      {open && (
        <span role="tooltip" id={id} className="helpTipBubble">
          {text}
        </span>
      )}
    </span>
  );
}
