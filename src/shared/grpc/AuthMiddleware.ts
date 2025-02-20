import { ClientError, ClientMiddleware, Metadata, Status } from "nice-grpc-web";
import toast from "react-hot-toast";
import { TokenService } from "@/shared/lib";

export type AuthMiddlewareParams = {
  getAccessToken: (signal?: AbortSignal) => string | undefined;
  onRefreshFail: () => void;
};

export function AuthMiddleware({
  getAccessToken,
  onRefreshFail,
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
        const { newAccessToken } =
          await TokenService.refreshToken(onRefreshFail);

        toast.error(error.message);
        const newMetadata = Metadata(options.metadata).set(
          "Authorization",
          `Bearer ${newAccessToken}`,
        );
        // Повторяем запрос с обновленным токеном
        const response = yield* call.next(call.request, {
          ...options,
          metadata: newMetadata,
        });
        return response;
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
