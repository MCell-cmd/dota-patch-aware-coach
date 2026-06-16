import { test, expect } from "@playwright/test";

// Para los flujos funcionales marcamos el onboarding como visto para que el tour
// no tape los clics.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => localStorage.setItem("dpac.onboarded.v1", "1"));
});

test("la home carga con el draft y una recomendación", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".brandTitle")).toBeVisible();
  await expect(page.locator(".resultName")).toBeVisible();
  // hay 24 héroes con su retrato
  await expect(page.locator(".heroButton")).toHaveCount(24);
});

test("el desglose muestra el radar de scoring", async ({ page }) => {
  await page.goto("/");
  await page.locator(".detailsToggleBtn").click();
  await expect(page.locator(".radarChart")).toBeVisible();
});

test("cambiar el pool actualiza la recomendación sin romper", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".resultName")).toBeVisible();
  // añadir un héroe que no está en el pool por defecto
  await page.locator(".heroButton", { hasText: "Juggernaut" }).click();
  await page.waitForLoadState("networkidle");
  // sigue habiendo una recomendación válida con su puntaje
  await expect(page.locator(".resultName")).toBeVisible();
  await expect(page.locator(".radialScoreNum")).toBeVisible();
});

test("navegación entre las 4 pestañas", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Patch Coach/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/parche/i);
  await page.getByRole("button", { name: /Replay Analysis/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/post-partida/i);
  await page.getByRole("button", { name: /Workspace Coach/ }).click();
  await expect(page.locator(".toolTitle")).toContainText(/workspace/i);
});

test("replay: un match ID inválido muestra un error claro", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Replay Analysis/ }).click();
  await page.locator("#matchIdInput").fill("123");
  await page.locator(".runActionBtn").click();
  await expect(page.locator(".displayPanelBody .emptyStateTitle")).toContainText(/no se pudo/i);
  await expect(page.locator(".displayPanelBody .emptyStateText")).toContainText(/inválido/i);
});

test("workspace: agregar alumno y respetar el mínimo de 1 al borrar", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Workspace Coach/ }).click();

  await page.locator(".addStudentForm input").fill("QA Alumno E2E");
  await page.getByRole("button", { name: /Añadir Alumno/ }).click();
  await expect(page.locator(".studentRowWrapper")).toHaveCount(4);

  // borrar mientras existan botones de borrar; debe quedar al menos 1
  const del = page.locator(".deleteStudentBtn");
  while ((await del.count()) > 0) {
    await del.first().click();
  }
  await expect(page.locator(".studentRowWrapper")).toHaveCount(1);
});

test("la página de privacidad carga", async ({ page }) => {
  await page.goto("/privacidad");
  await expect(page.locator(".legalTitle")).toContainText("Privacidad");
  await page.getByRole("link", { name: /Volver al coach/ }).click();
  await expect(page.locator(".brandTitle")).toBeVisible();
});
