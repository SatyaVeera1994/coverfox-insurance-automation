import { Locator, Page } from "@playwright/test";


export async function handleFormField(
  locator: Locator,
  value: string | number | null | undefined
): Promise<void> {
  if (value === undefined || value === null) return;

  await locator.fill("");

  if (value !== "") {
    await locator.fill(value.toString());
  }
}

export async function handleFormSwitch(
  locator: Locator,
  value: boolean | undefined
): Promise<void> {
  if (typeof value !== "boolean") return;

  if (value) {
    await locator.check();
  } else {
    await locator.uncheck();
  }
}

export async function handleFormAutocomplete(
  page: Page,
  dropdown: Locator,
  value: string | number | boolean | Array<string | number | boolean> | null | undefined,
  clearButton?: Locator,
  multiple: boolean = false
): Promise<void> {

  if (value === undefined || value === null) return;

  if (!multiple && Array.isArray(value)) {
    throw new Error("Value must be a string when multiple=false");
  }

  await dropdown.hover();

  if (clearButton && await clearButton.isVisible()) {
    await clearButton.scrollIntoViewIfNeeded();
    await clearButton.click();
    await page.waitForLoadState("networkidle");
  }

  if (
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return;
  }

  const convertValueToLabel = (
    val: string | number | boolean
  ): string => {
    if (typeof val === "boolean") {
      return val ? "True" : "False";
    }
    return val.toString();
  };

  const items = multiple
    ? (value as Array<string | number | boolean>)
    : [value as string | number | boolean];

  const labels = items.map(convertValueToLabel);

  for (const label of labels) {
    await dropdown.click();

    const option = page.getByRole("option", {
      name: label,
      exact: true,
    });

    await option.waitFor({ state: "visible" });
    await option.click();
  }
}

