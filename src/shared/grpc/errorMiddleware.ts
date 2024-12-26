import {
  CallOptions,
  ClientError,
  ClientMiddlewareCall,
  Status,
} from "nice-grpc-web";
import { GrpcError } from "@/shared/grpc/grpc-error";
import { OperationStatus } from "../proto/custom_enums/v1/custom_enums";

type ResponseT = {
  status?: OperationStatus;
  description?: string;
};

export async function* errorMiddleware<Request, Response>(
  call: ClientMiddlewareCall<Request, Response>,
  options: CallOptions,
): AsyncGenerator<Response, void | Response, undefined> {
  const { request } = call;

  let response: Response | null | void = null;

  try {
    response = yield* call.next(request, options);
    if (
      (response as ResponseT)?.status !== OperationStatus.OPERATION_STATUS_OK
    ) {
      throw new GrpcError(
        "error",
        (response as ResponseT)?.status,
        (response as ResponseT)?.description,
      );
    }

    return response;
  } catch (error: unknown) {
    console.error("Caught error:", error);
    if (error instanceof ClientError && error.code === Status.NOT_FOUND) {
      throw new GrpcError(
        "Resource not found",
        OperationStatus.OPERATION_STATUS_ERROR,
      );
    }
    throw error; // Повторно выбрасываем остальные ошибки
  }
}
