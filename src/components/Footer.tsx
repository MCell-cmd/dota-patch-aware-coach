import Link from "next/link";
import { Swords } from "lucide-react";
import { PATCH_STATE } from "@/data/dota";

export function Footer() {
  return (
    <footer className="siteFooter">
      <div className="siteFooterInner">
        <div className="footerBrand">
          <Swords size={16} className="footerBrandIcon" />
          <div>
            <span className="footerBrandName">Dota Patch-Aware Coach</span>
            <span className="footerBrandNote">
              Análisis con datos reales de OpenDota · Parche {PATCH_STATE.version}
            </span>
          </div>
        </div>

        <nav className="footerLinks" aria-label="Enlaces">
          <Link href="/privacidad">Privacidad</Link>
          <a href="https://www.opendota.com" target="_blank" rel="noopener noreferrer">
            OpenDota
          </a>
          <a href="https://store.steampowered.com/app/570/Dota_2/" target="_blank" rel="noopener noreferrer">
            Dota 2
          </a>
        </nav>

        <p className="footerLegal">
          No afiliado a Valve. Dota 2 es una marca registrada de Valve Corporation.
        </p>
      </div>
    </footer>
  );
}
