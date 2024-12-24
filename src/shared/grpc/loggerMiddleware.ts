import { isAbortError } from "abort-controller-x";
import memoizeOne from "memoize-one";

import {
  CallOptions,
  ClientError,
  ClientMiddlewareCall,
  MethodDescriptor,
} from "nice-grpc-web";

import { rootLogger } from "../logger/logger";

const getLogger = memoizeOne((method: MethodDescriptor) => {
  const { path } = method;
  const [serviceName, methodName] = path.split("/").slice(1);

  return rootLogger.child({
    name: "gRPC.Client",
    grpcService: serviceName,
    grpcMethod: methodName,
  });
});

export async function* loggerMiddleware<Request, Response>(
  call: ClientMiddlewareCall<Request, Response>,
  options: CallOptions,
): AsyncGenerator<Response, void | Response, undefined> {
  const { request, requestStream, responseStream, method } = call;

  const callType = requestStream
    ? responseStream
      ? "Bidirectional streaming"
      : "Client streaming"
    : responseStream
    ? "Server streaming"
    : "Unary";

  const logger = getLogger(method);

  logger.trace({ request }, `${callType} call started`);

  let response: Awaited<Response> | void = undefined;
  let hadError = false;
  let err: unknown;

  try {
    response = yield* call.next(request, options);

    return response;
  } catch (e) {
    console.log(e, "e in logger");
    hadError = true;
    err = e;
    throw e;
  } finally {
    if (!hadError || err instanceof ClientError) {
      logger.trace({ request, response, err }, `${callType} call ended`);
    } else if (isAbortError(err)) {
      logger.trace({ request, err }, `${callType} call cancelled`);
    } else {
      logger.error(
        { request, err },
        `${callType} call failed with unknown error`,
      );
    }
  }
}
