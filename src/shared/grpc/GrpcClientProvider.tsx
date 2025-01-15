import { retryMiddleware } from "nice-grpc-client-middleware-retry";
import { Client, createChannel, createClientFactory } from "nice-grpc-web";
import { PropsWithChildren } from "react";
import { useMemo } from "use-memo-one";

import { AuthMiddleware } from "./AuthMiddleware";
import { GrpcClientsContextValue, grpcClientsContext } from "./context";
import { errorMiddleware } from "./errorMiddleware";
import { loggerMiddleware } from "./loggerMiddleware";
import { TokenService } from "../lib/tokenService";

const channel = createChannel(
  process.env.NEXT_PUBLIC_API_URL ?? "https://beta.api-tips.api.quckoo.net",
);

export const GrpcClientsProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo((): GrpcClientsContextValue => {
    let clientFactory = createClientFactory()
      .use(loggerMiddleware)
      .use(retryMiddleware);

    clientFactory = clientFactory
      .use(AuthMiddleware({ getAccessToken: TokenService.getAccessToken }))
      .use(errorMiddleware);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const clients = new Map<object, Client<any>>();

    return {
      getClient(definition) {
        let client = clients.get(definition);

        if (client == null) {
          client = clientFactory.create(definition, channel);
          clients.set(definition, client);
        }

        return client;
      },
    };
  }, []);

  return (
    <grpcClientsContext.Provider value={value}>
      {children}
    </grpcClientsContext.Provider>
  );
};
