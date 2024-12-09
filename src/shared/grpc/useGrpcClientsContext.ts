import { GrpcClientsContextValue, grpcClientsContext } from "./context";
import { useStrictContext } from "../hooks/useSctrictContext";

export function useGrpcClientsContext(): GrpcClientsContextValue {
  return useStrictContext(grpcClientsContext);
}
