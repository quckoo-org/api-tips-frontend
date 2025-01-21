import { Timestamp } from "@/shared/proto/google/protobuf/timestamp";

export type OrderT = {
  id: number;
  orderNumber: number;
  createdAt: Timestamp;
  tariff: {
    name: string;
  };
  sum: number;
  currency: string;
  status: string;
  firstName: string;
  lastName: string;
  email: string;
  count: number;
};
