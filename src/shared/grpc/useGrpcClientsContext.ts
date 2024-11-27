import { useStrictContext } from "../hooks/useSctrictContext";
import { GrpcClientsContextValue, grpcClientsContext } from "./context";

export function useGrpcClientsContext(): GrpcClientsContextValue {
  return useStrictContext(grpcClientsContext);
}
