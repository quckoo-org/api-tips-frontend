import { ClientError, ClientMiddleware, Metadata } from "nice-grpc-web";
import { toast } from "react-hot-toast";

export type AuthMiddlewareParams = {
  getAccessToken: (signal?: AbortSignal) => string | undefined;
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
        toast.error(error.details);
      } else {
        throw error;
      }
    }
  };
}
