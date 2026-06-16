import { test, expect } from "@playwright/test";

test("/api/auth/me sin sesión devuelve user null", async ({ request }) => {
  const res = await request.get("/api/auth/me");
  expect(res.ok()).toBeTruthy();
  expect(await res.json()).toEqual({ user: null });
});

test("/api/draft devuelve una recomendación", async ({ request }) => {
  const res = await request.post("/api/draft", {
    data: {
      role: "mid",
      bracket: "archon",
      style: "comfort",
      heroPool: ["viper", "lina"],
      allies: ["axe"],
      enemies: ["lion"],
    },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.best?.hero?.name).toBeTruthy();
});

test("/api/draft rechaza un cuerpo inválido con 400", async ({ request }) => {
  const res = await request.post("/api/draft", { data: { role: "mid" } });
  expect(res.status()).toBe(400);
});

test("/api/auth/steam/login redirige a Steam (OpenID)", async ({ request }) => {
  const res = await request.get("/api/auth/steam/login", { maxRedirects: 0 });
  expect([301, 302, 307, 308]).toContain(res.status());
  expect(res.headers()["location"]).toContain("steamcommunity.com/openid/login");
});
