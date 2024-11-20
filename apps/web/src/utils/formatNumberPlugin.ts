import { addFilter } from "@repo/hooks";

export function formatNumber(
  number: number,
  options: {
    locale?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
  } = {}
): string {
  const {
    locale = "en-US",
    minimumFractionDigits,
    maximumFractionDigits,
  } = options;
  return number.toLocaleString(locale, {
    minimumFractionDigits,
    maximumFractionDigits,
  });
}
addFilter("format_number", "plugin-format-number", formatNumber);
