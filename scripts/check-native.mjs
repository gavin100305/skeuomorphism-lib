import { chromium } from "playwright";
import { readFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const base = process.env.NATIVE_TEST_URL ?? "http://localhost:3199";
const catalog = JSON.parse(await readFile("mobile/catalog.json", "utf8"));
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE,
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
  const f = page.frameLocator("main#docs-workspace:visible #preview iframe");
  await f.locator("#root").waitFor();
  await page.getByText("Loading native preview…").waitFor({ state: "hidden" });
  return f;
};
try {
  await page.goto(`${base}/docs/mobile`);
  await page.getByRole("button", { name: "Bottom bars", exact: true }).click();
  assert.equal(await page.locator(".native-tile").count(), 1);
  await page.goto(`${base}/templates/mobile`);
  assert.equal(await page.locator(".native-tile").count(), 1);
  await page.locator(".native-tile").getByRole("heading", { name: "Pocket" }).waitFor();
  await page.goto(`${base}/docs/mobile`);
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
  for (const width of [390, 1366]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${base}/`);
    assert.equal(await page.getByRole("group", { name: "Library platform" }).count(), 0);
    await page.goto(`${base}/templates/mobile`);
    const platform = page.getByRole("group", { name: "Library platform" });
    await platform.getByRole("link", { name: "Web", exact: true }).click();
    await page.waitForURL("**/templates");
    await platform.getByRole("link", { name: "Mobile", exact: true }).click();
    await page.waitForURL("**/templates/mobile");
    assert.equal(await platform.getByRole("link", { name: "Mobile", exact: true }).getAttribute("aria-current"), "page");
  }
  await preview("badge");
  assert.equal(await page.locator("#preview .native-phone").count(), 0);
  assert(await page.locator("#preview .native-inline-preview").isVisible());
  await page.getByRole("button", { name: "Code", exact: true }).click();
  assert.equal(await page.locator("main#docs-workspace:visible #preview iframe").count(), 0);
  await page.getByRole("button", { name: "Preview", exact: true }).click();
  await page.frameLocator("main#docs-workspace:visible #preview iframe").getByText("In progress", { exact: true }).waitFor();
  for (const item of catalog) {
    const f = await preview(item.slug);
    const text = await f.locator("body").innerText();
    assert(
      text.trim().length > 0 && !text.includes("Choose a component."),
      `Missing preview ${item.slug}`,
    );
  }
  let f = await preview("slider");
  const fader = f.getByRole("slider", { name: "Depth" });
  await fader.press("ArrowRight");
  assert.equal(await fader.inputValue(), "66");
  await fader.press("Home");
  assert.equal(await fader.inputValue(), "0");
  await fader.press("End");
  assert.equal(await fader.inputValue(), "100");

  f = await preview("pocket");
  await f.getByRole("button", { name: "View all", exact: true }).click();
  await f.getByRole("heading", { name: "Transactions", exact: true }).waitFor();
  await f.getByRole("tab", { name: "Home", exact: true }).click();
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
      .getByRole("heading", { name: "Good morning, Alex." })
      .evaluate((e) => getComputedStyle(e).color),
    "rgb(239, 239, 235)",
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
      "/",
      "/docs/mobile",
      "/docs/mobile/blocks",
      "/docs/mobile/badge",
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
      await page.getByText("Loading native preview…").waitFor({ state: "hidden" });
      const phone = await page.locator(".native-phone").boundingBox();
      assert(Math.abs(phone.width / phone.height - 9 / 19.5) < 0.01);
      await screenshot("pocket-mobile-site");
    }
  }
  assert.deepEqual(errors, []);
  console.log(
    "PASS: 26 live previews; platform switch; four bars; fader keyboard controls; expense add/balance; theme bridge; persistent focus/habits; activity period; carousel bounds; native/web routes at 320/390/768/1280px.",
  );
} catch (error) {
  console.error("Browser errors:", errors);
  throw error;
} finally {
  await browser.close();
}
