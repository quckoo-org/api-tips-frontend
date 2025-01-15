import { Tariff } from "@/shared/proto/api_tips_tariff/v1/api_tips_tariff";

export interface TariffFormValues extends Omit<Tariff, "id" | "isHidden"> {
  isHidden: boolean;
}
