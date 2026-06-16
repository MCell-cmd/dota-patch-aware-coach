// Rate limit + cache TTL en memoria de proceso. Suficiente para el MVP de una
// sola instancia. En despliegue multi-instancia (varias lambdas), sustituir por
// un store compartido (Redis/Upstash); la firma de estas funciones no cambiaría.

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateResult = { ok: boolean; remaining: number; retryAfterMs: number };

/**
 * Ventana fija por clave (p.ej. `report:<ip>`). Devuelve si la petición pasa,
 * cuántas quedan en la ventana y, si se rechaza, cuánto esperar.
 */
export function rateLimit(key: string, limit: number, windowMs: number): RateResult {
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || now >= bucket.resetAt) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: limit - 1, retryAfterMs: 0 };
  }
  if (bucket.count >= limit) {
    return { ok: false, remaining: 0, retryAfterMs: bucket.resetAt - now };
  }
  bucket.count += 1;
  return { ok: true, remaining: limit - bucket.count, retryAfterMs: 0 };
}

type Entry<T> = { value: T; expiresAt: number };
const store = new Map<string, Entry<unknown>>();
const MAX_ENTRIES = 500; // evita crecimiento no acotado en procesos longevos

export function cacheGet<T>(key: string): T | null {
  const entry = store.get(key);
  if (!entry) return null;
  if (Date.now() >= entry.expiresAt) {
    store.delete(key);
    return null;
  }
  return entry.value as T;
}

export function cacheSet<T>(key: string, value: T, ttlMs: number): void {
  // Eviction simple: si se llena, descarta la entrada más antigua insertada.
  if (store.size >= MAX_ENTRIES) {
    const oldest = store.keys().next().value;
    if (oldest !== undefined) store.delete(oldest);
  }
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
}
