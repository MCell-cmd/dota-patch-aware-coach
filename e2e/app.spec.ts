import { test, expect } from "@playwright/test";

async function gotoApp(page: import("@playwright/test").Page) {
  await page.goto("/");
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
}

// Para los flujos funcionales marcamos el onboarding como visto para que el tour
// no tape los clics.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("dpac.onboarded.v1", "1"));
});

test("la home carga con el draft y una recomendación", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".brandTitle")).toBeVisible();
  await expect(page.locator(".resultName")).toBeVisible();
  // hay 24 héroes con su retrato
  await expect(page.locator(".heroButton")).toHaveCount(24);
});

test("el desglose muestra el radar de scoring", async ({ page }) => {
  await gotoApp(page);
  await page.locator(".detailsToggleBtn").click();
  await expect(page.locator(".radarChart")).toBeVisible();
});

test("cambiar el pool actualiza la recomendación sin romper", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".resultName")).toBeVisible();
  // añadir un héroe que no está en el pool por defecto
  await page.locator(".heroButton", { hasText: "Juggernaut" }).click();
  await page.waitForLoadState("networkidle");
  // sigue habiendo una recomendación válida con su puntaje
  await expect(page.locator(".resultName")).toBeVisible();
  await expect(page.locator(".radialScoreNum")).toBeVisible();
});

test("el buscador del pool filtra heroes", async ({ page }) => {
  await gotoApp(page);
  await page.getByLabel(/Buscar en Mi Pool/).fill("queen");
  await expect(page.locator(".heroButton")).toHaveCount(1);
  await expect(page.locator(".heroButton")).toContainText("Queen of Pain");
});

test("vaciar el pool pide marcar héroes en vez de recomendar al azar", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".resultName")).toBeVisible();
  const selected = page.locator('.heroButton[aria-pressed="true"]');
  while ((await selected.count()) > 0) {
    await selected.first().click();
  }
  await page.waitForLoadState("networkidle");
  await expect(page.locator(".resultName")).toHaveCount(0);
  await expect(page.getByText(/Marca tu pool de héroes/i)).toBeVisible({ timeout: 10_000 });
});

test("cambiar enemigos visibles cambia el pick recomendado", async ({ page }) => {
  await gotoApp(page);
  await expect(page.locator(".resultName")).toHaveText("Viper");

  const enemyColumn = page.locator(".fieldGroup").filter({ hasText: "Enemigos ya elegidos" });
  await enemyColumn.getByRole("button", { name: /Phantom Assassin/ }).click();
  await enemyColumn.getByRole("button", { name: /Lion/ }).click();
  await enemyColumn.getByRole("button", { name: /Tidehunter/ }).click();
  await enemyColumn.getByRole("button", { name: /Queen of Pain/ }).click();

  await expect(page.locator(".resultName")).not.toHaveText("Viper", { timeout: 10_000 });
});

test("navegación entre las pestañas principales", async ({ page }) => {
  await gotoApp(page);
  await page.getByRole("button", { name: /Patch Coach/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/parche/i);
  await page.getByRole("button", { name: /Vision Coach/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/vision/i);
  await page.getByRole("button", { name: /Replay Analysis/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/post-partida/i);
});

test("vision coach permite seleccionar escenarios", async ({ page }) => {
  await gotoApp(page);
  await page.getByRole("button", { name: /Vision Coach/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/vision/i);
  await page.getByRole("button", { name: /Late/ }).click();
  await page.getByRole("button", { name: /Roshan late/ }).click();
  await expect(page.locator(".panelTitle").filter({ hasText: "Roshan late" })).toBeVisible();
});

test("replay: un match ID inválido muestra un error claro", async ({ page }) => {
  await gotoApp(page);
  await page.getByRole("button", { name: /Replay Analysis/ }).click();
  await page.locator("#matchIdInput").fill("123");
  await page.locator(".runActionBtn").click();
  await expect(page.locator(".displayPanelBody .emptyStateTitle")).toContainText(/no se pudo/i);
  await expect(page.locator(".displayPanelBody .emptyStateText")).toContainText(/inválido/i);
});

test("la página de privacidad carga", async ({ page }) => {
  await page.goto("/privacidad");
  await expect(page.locator(".legalTitle")).toContainText("Privacidad");
  await page.getByRole("link", { name: /Volver al coach/ }).click();
  await expect(page.locator('[data-app-ready="true"]')).toBeVisible();
  await expect(page.locator(".brandTitle")).toBeVisible();
});
