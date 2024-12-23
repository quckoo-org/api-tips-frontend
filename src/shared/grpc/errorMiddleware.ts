import {
  CallOptions,
  ClientError,
  ClientMiddlewareCall,
  Status,
} from "nice-grpc-web";

export async function* errorMiddleware<Request, Response>(
  call: ClientMiddlewareCall<Request, Response>,
  options: CallOptions,
): AsyncGenerator<Response, void | Response, undefined> {
  const { request } = call;

  let response: Awaited<Response> | null | void = null;

  try {
    response = yield* call.next(request, options);

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
