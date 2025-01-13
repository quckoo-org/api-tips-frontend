import { OperationStatus } from "@/shared/proto/custom_enums/v1/custom_enums";

export class GrpcError extends Error {
  public status?: OperationStatus;
  public description?: string;

  constructor(message: string, status?: OperationStatus, description?: string) {
    super(message);
    this.name = "GrpcError";
    this.status = status;
    this.description = description;
  }
}
