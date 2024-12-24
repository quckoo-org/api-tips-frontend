"use clients";

import { Select } from "@mantine/core";
import clsx from "clsx";
import { countries } from "countries-list";
import i18nCountries from "i18n-iso-countries";
import { usePathname } from "next/navigation";
import { FC, useMemo } from "react";
import { useTranslations } from "@/shared/locale/translations";

// eslint-disable-next-line @typescript-eslint/no-require-imports
i18nCountries.registerLocale(require("i18n-iso-countries/langs/en.json"));
// eslint-disable-next-line @typescript-eslint/no-require-imports
i18nCountries.registerLocale(require("i18n-iso-countries/langs/ru.json"));
// eslint-disable-next-line @typescript-eslint/no-require-imports
i18nCountries.registerLocale(require("i18n-iso-countries/langs/fr.json"));

type CountrySelectProps = {
  className?: string;
  onChangeCountry: (id: string | undefined) => void;
  value?: string | undefined;
  error?: string;
  hideLabel?: boolean;
};

export const CountrySelect: FC<CountrySelectProps> = ({
  className,
  onChangeCountry,
  value,
  error,
  hideLabel = false,
}) => {
  const pathname = usePathname(); // Текущий путь
  const locale = pathname.split("/")[1] || "en";

  const { t } = useTranslations();
  //const countriesQuery = useGetCountries();

  const handleChangeCountry = (value: string | null) => {
    if (!value) {
      onChangeCountry(undefined);

      return;
    }
    onChangeCountry(value);
  };

  const data = useMemo(() => {
    return Object.entries(countries).map(([code, country]) => ({
      value: code,
      label: i18nCountries.getName(code, locale) || country.name,
    }));
  }, [locale]);

  return (
    <Select
      label={hideLabel ? undefined : t("country")}
      placeholder={t("select_country")}
      className={clsx("", className)}
      value={value?.toString() ?? null}
      error={error}
      data={data}
      onChange={handleChangeCountry}
    />
  );
};
