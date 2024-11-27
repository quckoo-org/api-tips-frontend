"use client";

import { createContext, ReactNode, useContext } from "react";
import { Locale } from "@/config/i18n/i18n-config";
import { getDictionary } from "./getDictionary";

const TranslationContext = createContext<{
  t: (key: string) => string;
  locale: string;
} | null>(null);

export const TranslationProvider = ({
  children,
  dictionary,
  locale,
}: {
  children: ReactNode;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
  locale: Locale;
}) => {
  const t = (key: string) =>
    dictionary[key as keyof typeof getDictionary] || key;

  return (
    <TranslationContext.Provider value={{ t, locale }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error(
      "useTranslations must be used within a TranslationProvider",
    );
  }
  return context;
};
