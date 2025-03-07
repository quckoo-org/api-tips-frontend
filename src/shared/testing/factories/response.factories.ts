import { OperationStatus } from "@/shared/proto/custom_enums/v1/custom_enums";
import { GeneralResponse } from "@/shared/proto/general_entities/v1/general_entities";

/**
 * Создает моковый объект стандартного ответа API
 */
export const createMockGeneralResponse = (overrides = {}): GeneralResponse => ({
  status: OperationStatus.OPERATION_STATUS_OK,
  description: "Success",
  ...overrides,
});
