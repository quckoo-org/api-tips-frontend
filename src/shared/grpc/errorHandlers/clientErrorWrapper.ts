import { OperationStatus } from "@/shared/proto/custom_enums/v1/custom_enums";
import { ClientError, Status } from "nice-grpc-web";

export class DeltaServerError extends Error {
  status: OperationStatus;
  statusDescription: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pureError: any;
  constructor(
    status: OperationStatus,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const clientErrorWrapper = (accessFn: (...args: any) => any) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (...args: any) => {
    try {
      const res = await accessFn(...args);

      if (res && res.status !== OperationStatus.OPERATION_STATUS_OK) {
        throw new DeltaServerError(res.status, res, "", res.statusDescription);
      }

      return res;
    } catch (e) {
      if (e instanceof ClientError) {
        switch (e.code) {
          case Status.PERMISSION_DENIED:
            throw new DeltaServerError(
              OperationStatus.OPERATION_STATUS_NOT_PERMITTED,
              e,
              "Нет доступа для выполнения операции",
            );
          default:
            throw new DeltaServerError(
              OperationStatus.OPERATION_STATUS_UNSPECIFIED,
              e,
              e.details,
            );
        }
      } else if (e instanceof DeltaServerError) {
        switch (e.status) {
          case OperationStatus.OPERATION_STATUS_UNSPECIFIED:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Unspecified error",
              e.statusDescription,
            );
          case OperationStatus.OPERATION_STATUS_ERROR:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Ошибка",
              e.statusDescription,
            );
          case OperationStatus.OPERATION_STATUS_NOT_PERMITTED:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Нет доступа для выполнения операции",
              e.statusDescription,
            );
          case OperationStatus.OPERATION_STATUS_DUPLICATE:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Данные уже существуют",
              e.statusDescription,
            );
          case OperationStatus.OPERATION_STATUS_SERVER_ERROR:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Внутренняя ошибка сервера",
              e.statusDescription,
            );
          case OperationStatus.OPERATION_STATUS_NO_DATA:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Нет данных для обработки",
              e.statusDescription,
            );
          case OperationStatus.OPERATION_STATUS_LOCKED:
            throw new DeltaServerError(e.status, e, e.statusDescription);
          case OperationStatus.OPERATION_STATUS_DECLINED:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Операция невозможна",
              e.statusDescription,
            );
          default:
            throw new DeltaServerError(
              e.status,
              e.pureError,
              "Неизвестная ошибка",
              e.statusDescription,
            );
        }
      } else {
        if (e instanceof Error) {
          return;
        }

        throw e;
      }
    }
  };
};
