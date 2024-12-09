import { ClientError, ClientMiddleware, Metadata } from "nice-grpc-web";

export type AuthMiddlewareParams = {
  getAccessToken: (signal?: AbortSignal) => string;
};

export function AuthMiddleware({
  getAccessToken,
}: AuthMiddlewareParams): ClientMiddleware {
  return async function* authMiddleware(call, options) {
    const token = getAccessToken(options.signal);

    const metadata = Metadata(options.metadata).set(
      "Authorization",
      `Bearer ${token}`,
    );

    try {
      const response = yield* call.next(call.request, {
        ...options,
        metadata,
      });

      return response;
    } catch (error) {
      if (error instanceof ClientError) {
        // toast.error(error.details);
        throw error;
      } else {
        throw error;
      }
    }
  };
}
