import translations from "@/public/dictionaries/en.json";
import { useTranslations } from "@/shared/locale/translations";

export const createTranslationMock = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (useTranslations as any).mockReturnValue({
    t: (key: string) => {
      // Используем реальные переводы, если они есть
      if (translations && key in translations) {
        return translations[key as keyof typeof translations] || key;
      }
    },
  });
};

export const getTranslatedText = (key: string) => {
  if (translations && key in translations) {
    return translations[key as keyof typeof translations] || key;
  }
};
