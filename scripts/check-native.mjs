import { chromium } from "playwright";
import { readFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.NATIVE_TEST_URL ?? "http://localhost:3199";
const catalog = JSON.parse(await readFile("mobile/catalog.json", "utf8"));
const browser = await chromium.launch({
  headless: true,
  args: ["--no-sandbox"],
});
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await mkdir("local-docs/screenshots/mobile-revision", { recursive: true });
const screenshot = async (name) => {
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(250);
  return page.screenshot({
    path: `local-docs/screenshots/mobile-revision/${name}.png`,
    fullPage: true,
  });
};
const preview = async (slug) => {
  console.log("Checking", slug);
  await page.goto(`${base}/docs/mobile/${slug}`);
  const f = page.frameLocator("iframe");
  await f.locator("#root").waitFor();
  await page.getByText("Loading native preview…").waitFor({ state: "hidden" });
  return f;
};
try {
  await page.goto(`${base}/docs/mobile`);
  await page.getByRole("button", { name: "Bottom bars", exact: true }).click();
  assert.equal(await page.locator(".native-tile").count(), 4);
  await page.getByRole("button", { name: "All", exact: true }).click();
  await screenshot("catalog-desktop");
  await page
    .getByRole("group", { name: "Library platform" })
    .getByRole("link", { name: "Web", exact: true })
    .click();
  await page.waitForURL("**/docs");
  await page
    .getByRole("group", { name: "Library platform" })
    .getByRole("link", { name: "Mobile", exact: true })
    .click();
  await page.waitForURL("**/docs/mobile");
  for (const item of catalog) {
    const f = await preview(item.slug);
    const text = await f.locator("body").innerText();
    assert(
      text.trim().length > 0 && !text.includes("Choose a component."),
      `Missing preview ${item.slug}`,
    );
  }
  let f = await preview("pocket");
  await f
    .getByRole("button", { name: "+ Add a transaction", exact: true })
    .click();
  await f
    .getByRole("textbox", { name: "Description", exact: true })
    .fill("Afternoon tea");
  await f
    .getByRole("textbox", { name: "Amount in rupees", exact: true })
    .fill("90");
  await f.getByRole("button", { name: "Add transaction", exact: true }).click();
  await f.getByText("Afternoon tea", { exact: true }).waitFor();
  await f.getByRole("tab", { name: "Home", exact: true }).click();
  await f.getByText("₹42,770", { exact: true }).waitFor();
  await screenshot("pocket-light");
  await page.evaluate(() => {
    localStorage.setItem("skeuomorphism-theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  });
  await page.waitForTimeout(200);
  assert.equal(
    await f
      .getByText("Total balance", { exact: true })
      .evaluate((e) => getComputedStyle(e).color),
    "rgb(170, 170, 165)",
  );
  await screenshot("pocket-dark");
  f = await preview("still");
  await f.getByRole("button", { name: "Start focus", exact: true }).click();
  await f.getByRole("tab", { name: "Habits", exact: true }).click();
  await f
    .getByRole("checkbox", { name: "Read ten pages", exact: true })
    .click();
  await f.getByRole("tab", { name: "Focus", exact: true }).click();
  await f.getByRole("button", { name: "Pause", exact: true }).waitFor();
  assert.equal(
    await f
      .getByRole("checkbox", { name: "Read ten pages", exact: true })
      .getAttribute("aria-checked"),
    "true",
  );
  await f.getByRole("button", { name: "Pause", exact: true }).click();
  await screenshot("still-dark");
  f = await preview("daybook");
  await f.getByRole("tab", { name: "Activity", exact: true }).click();
  await f.getByRole("button", { name: "Last week", exact: true }).click();
  await f.getByText("20.0 hrs", { exact: true }).waitFor();
  await f.getByRole("tab", { name: "Today", exact: true }).click();
  await screenshot("daybook-dark");
  for (const bar of ["dock", "keys", "rail", "pill"]) {
    f = await preview("bottom-bar-" + bar);
    await f.getByRole("tab", { name: "Profile", exact: true }).click();
    assert.equal(
      await f
        .getByRole("tab", { name: "Profile", exact: true })
        .getAttribute("aria-selected"),
      "true",
    );
  }
  f = await preview("photo-carousel");
  assert(await f.getByRole("button", { name: "Previous photo" }).isDisabled());
  await f.getByRole("button", { name: "Next photo" }).click();
  await f.getByText("The longer way home", { exact: true }).waitFor();
  assert(await f.getByRole("button", { name: "Next photo" }).isDisabled());
  for (const width of [320, 390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of [
      "/docs/mobile",
      "/templates/mobile",
      "/docs/mobile/pocket",
      "/docs/button",
      "/templates",
    ]) {
      await page.goto(base + route);
      assert(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth + 1,
        ),
        `Overflow ${route} @${width}`,
      );
    }
    if (width === 390) {
      await page.goto(base + "/docs/mobile/pocket");
      await screenshot("pocket-mobile-site");
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 26 live previews; platform switch; four bars; expense add/balance; theme bridge; persistent focus/habits; activity period; carousel bounds; native/web routes at 320/390/768/1280px.",
  );
} catch (error) {
  console.error("Browser errors:", errors);
  throw error;
} finally {
  await browser.close();
}
