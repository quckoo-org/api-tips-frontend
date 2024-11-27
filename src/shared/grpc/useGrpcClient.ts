import { RetryOptions } from "nice-grpc-client-middleware-retry";
import { Client, CompatServiceDefinition } from "nice-grpc-web";

import { grpcClientsContext } from "./context";
import { useStrictContext } from "../hooks/useSctrictContext";

export function useGrpcClient<Service extends CompatServiceDefinition>(
  definition: Service
): Client<Service, RetryOptions> {
  const context = useStrictContext(grpcClientsContext);

  return context.getClient(definition);
}
