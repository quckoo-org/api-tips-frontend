export type TariffFormValues = {
  startDate: Date | null;
  endDate: Date | null;
  name: string;
  freeRequests: number;
  paidRequests: number;
  totalRequests: number;
  cost: number;
  totalCost: number;
};
