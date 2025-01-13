import { Timestamp } from "@/shared/proto/google/protobuf/timestamp";

export type TariffT = {
  id: number;
  startDate: string;
  endDate: string;
  name: string;
  freeRequests: number;
  paidRequests: number;
  totalRequests: number;
  cost: number;
  totalCost: number;
  isHidden: Timestamp | null;
};
