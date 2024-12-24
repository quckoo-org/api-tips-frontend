import {
  CallOptions,
  ClientError,
  ClientMiddlewareCall,
  Status,
} from "nice-grpc-web";
import { OperationStatus } from "../proto/custom_enums/v1/custom_enums";

type ResponseT = {
  status: OperationStatus;
  details: string;
};

export async function* errorMiddleware<Request, Response extends ResponseT>(
  call: ClientMiddlewareCall<Request, Response>,
  options: CallOptions,
): AsyncGenerator<Response, void | Response, undefined> {
  const { request } = call;

  let response: Response | null | void = null;

  try {
    response = yield* call.next(request, options);

    if (response?.status !== OperationStatus.OPERATION_STATUS_OK) {
      throw new Error(response?.details);
    }

    return response;
  } catch (error: unknown) {
    if (error instanceof ClientError && error.code === Status.NOT_FOUND) {
      response = null;
      throw error;
    } else {
      throw error;
    }
  }
}
