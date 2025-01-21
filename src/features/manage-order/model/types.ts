import { OrderT } from "@/entities/order";

export type OrderFormValues = Omit<OrderT, "createdAt" | "id">;
