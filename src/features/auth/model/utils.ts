"use client";

import { useTranslations } from "@/shared/locale/translations";

export const useGetPasswordValidationRules = () => {
  const { t } = useTranslations();

  return {
    minLength: {
      value: 8,
      message: t("password_must_be_more_then_8_characters_long"),
    },
    validate: {
      minLength: (value: string) =>
        value.length >= 8 || t("password_must_be_more_then_8_characters_long"),
      hasUppercase: (value: string) =>
        /[A-Z]/.test(value) ||
        t("password_must_contain_at_least_1_uppercase_letter"),
      hasLowercase: (value: string) =>
        /[a-z]/.test(value) ||
        t("password_must_contain_at_least_1_lowercase_letter"),
      hasDigit: (value: string) =>
        /\d/.test(value) || t("password_must_contain_at_least_1_digit"),
      noSpaces: (value: string) =>
        /^\S*$/.test(value) || t("password_must_not_contain_spaces"),
    },
  };
};

// Правила:
// 8 символов
// Минимум 1 большая буква
// Минимум 1 маленькая буква
// Минимум 1 цифра
// Запрет на пробелы
