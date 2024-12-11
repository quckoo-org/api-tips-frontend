"use clients";

import { Select } from "@mantine/core";
import clsx from "clsx";
import { FC } from "react";
import { useTranslations } from "@/shared/locale/translations";
import { useGetCountries } from "../model/use-get-countries";

type CountrySelectProps = {
  className?: string;
  onChangeCountry: (id: number | null) => void;
  value?: number | null;
};

export const CountrySelect: FC<CountrySelectProps> = ({
  className,
  onChangeCountry,
  value,
}) => {
  const { t } = useTranslations();
  const countriesQuery = useGetCountries();

  const handleChangeCountry = (value: string | null) => {
    if (!value) {
      onChangeCountry(null);

      return;
    }
    onChangeCountry(Number(value));
  };

  return (
    <Select
      label={t("country")}
      placeholder={t("select_country")}
      className={clsx("", className)}
      value={value?.toString() ?? null}
      data={countriesQuery.data ?? []}
      onChange={handleChangeCountry}
    />
  );
};
