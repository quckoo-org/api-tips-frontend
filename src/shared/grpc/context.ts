import { RetryOptions } from "nice-grpc-client-middleware-retry";
import { Client, CompatServiceDefinition } from "nice-grpc-web";
import { createContext } from "react";

export type GrpcClientsContextValue = {
  getClient<Service extends CompatServiceDefinition>(
    definition: Service
  ): Client<Service, RetryOptions>;
};

export const grpcClientsContext = createContext<GrpcClientsContextValue | null>(
  null
);

grpcClientsContext.displayName = "grpcClientsContext";
