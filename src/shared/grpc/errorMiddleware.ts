import {
  CallOptions,
  ClientError,
  ClientMiddlewareCall,
  Status,
} from "nice-grpc-web";
import { GeneralResponse } from "@/shared/proto/general_entities/v1/general_entities";
import { OperationStatus } from "../proto/custom_enums/v1/custom_enums";

export class ServerError extends Error {
  status: OperationStatus | undefined;
  statusDescription: string | undefined;
  //eslint-disable-next-line
  pureError: any;
  constructor(
    status: OperationStatus | undefined,
    //eslint-disable-next-line
    pureError: any,
    message?: string,
    statusDescription?: string,
  ) {
    super(message);
    this.status = status;
    this.pureError = pureError;
    this.statusDescription = statusDescription;
  }
}
type ResponseT = { response: GeneralResponse };

export async function* errorMiddleware<Request, Response>(
  call: ClientMiddlewareCall<Request, Response>,
  options: CallOptions,
): AsyncGenerator<Response, void | Response, undefined> {
  const { request } = call;

  let response: Response | null | void | ResponseT = null;

  try {
    response = yield* call.next(request, options);

    if (
      (response as ResponseT)?.response.status !==
        OperationStatus.OPERATION_STATUS_OK &&
      (response as ResponseT)?.response.status !==
        OperationStatus.OPERATION_STATUS_NO_DATA
    ) {
      throw new ServerError(
        (response as ResponseT).response.status,
        response,
        "",
        (response as ResponseT).response.description,
      );
    }

    return response;
  } catch (e) {
    if (e instanceof ClientError) {
      switch (e.code) {
        case Status.PERMISSION_DENIED:
          throw new ServerError(
            OperationStatus.OPERATION_STATUS_NOT_PERMITTED,
            e,
            "",
            e.details,
          );
        default:
          throw new ServerError(
            OperationStatus.OPERATION_STATUS_UNSPECIFIED,
            e,
            "",
            e.details,
          );
      }
    } else if (e instanceof ServerError) {
      switch (e.status) {
        case OperationStatus.OPERATION_STATUS_UNSPECIFIED:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
        case OperationStatus.OPERATION_STATUS_ERROR:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
        case OperationStatus.OPERATION_STATUS_NOT_PERMITTED:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
        case OperationStatus.OPERATION_STATUS_DUPLICATE:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
        case OperationStatus.OPERATION_STATUS_SERVER_ERROR:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
        case OperationStatus.OPERATION_STATUS_NO_DATA:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
        case OperationStatus.OPERATION_STATUS_LOCKED:
          throw new ServerError(e.status, e, e.statusDescription);
        case OperationStatus.OPERATION_STATUS_DECLINED:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
        default:
          throw new ServerError(e.status, e.pureError, "", e.statusDescription);
      }
    } else {
      if (e instanceof Error) {
        return;
      }

      throw e;
    }
  }
}
