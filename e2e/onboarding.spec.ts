import { test, expect } from "@playwright/test";

// Sin el flag de localStorage: el onboarding debe abrirse solo en la 1ª visita.
test("el tour de onboarding aparece en la primera visita y se cierra", async ({ page }) => {
  await page.goto("/");

  const popover = page.locator(".driver-popover");
  await expect(popover).toBeVisible({ timeout: 5000 });
  await expect(page.locator(".driver-popover-title")).toContainText("Tus 4 herramientas");

  await page.locator(".driver-popover-close-btn").click();
  await expect(popover).toHaveCount(0);
});
