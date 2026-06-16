// Tracking de eventos sin cookies (Plausible). El helper es seguro: si la
// analítica no está cargada (sin NEXT_PUBLIC_PLAUSIBLE_DOMAIN), no hace nada.
// Sirve para medir el funnel de validación (Fase 0): cuántos generan reporte,
// copian, o entran con Steam.

type PlausibleFn = (event: string, options?: { props?: Record<string, string | number | boolean> }) => void;

export function track(event: string, props?: Record<string, string | number | boolean>): void {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { plausible?: PlausibleFn }).plausible;
  fn?.(event, props ? { props } : undefined);
}
