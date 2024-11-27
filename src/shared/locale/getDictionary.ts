import "server-only";
import type { Locale } from "@/config/i18n/i18n-config";

// We enumerate all dictionaries here for better linting and typescript support
// We also get the default import for cleaner types
const dictionaries = {
  en: () =>
    import("@/public/dictionaries/en.json").then((module) => module.default),
  ru: () =>
    import("@/public/dictionaries/ru.json").then((module) => module.default),
};

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]?.() ?? dictionaries.en();
