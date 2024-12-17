import { retryMiddleware } from "nice-grpc-client-middleware-retry";
import { Client, createChannel, createClientFactory } from "nice-grpc-web";
import { PropsWithChildren } from "react";
import { useMemo } from "use-memo-one";

import { AuthMiddleware } from "./AuthMiddleware";
import { GrpcClientsContextValue, grpcClientsContext } from "./context";
import { loggerMiddleware } from "./loggerMiddleware";
import { TokenService } from "../lib/tokenService";

const URI = process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_HTTP2_PORT
    ? `http://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_HTTP2_PORT}`
    : 'http://api-tips-backend:3001';

const channel = createChannel(URI);

export const GrpcClientsProvider = ({ children }: PropsWithChildren) => {
  const value = useMemo((): GrpcClientsContextValue => {
    let clientFactory = createClientFactory()
      .use(loggerMiddleware)
      .use(retryMiddleware);

    clientFactory = clientFactory.use(
      AuthMiddleware({ getAccessToken: TokenService.getAccessToken }),
    );

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

GrpcClientsProvider.displayName = "GrpcClientsProvider";
