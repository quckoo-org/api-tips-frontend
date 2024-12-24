import { ClientError, ClientMiddleware, Metadata, Status } from "nice-grpc-web";
import { refreshToken } from "@/shared/grpc/refresh-token";

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
      if (
        error instanceof ClientError &&
        error.code === Status.UNAUTHENTICATED
      ) {
        // Здесь логика обновления токена
        await refreshToken();

        // Повторяем запрос с обновленным токеном
        return yield* call.next(call.request, {
          ...options,
          metadata,
        });
      }
      if (error instanceof ClientError) {
        // toast.error(error.details);
        throw error;
      } else {
        throw error;
      }
    }
  };
}
