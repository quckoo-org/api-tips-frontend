import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchClient } from "@/shared/utils/fetchClient";
import {
  RecoveryCodeErrorT,
  RecoveryCodeReqT,
  RecoveryCodedResT,
} from "./types";

export const useGetRecoveryCode = (req: Partial<RecoveryCodeReqT>) => {
  const getRecoveryCodeQuery = useMutation<
    RecoveryCodedResT,
    RecoveryCodeErrorT,
    RecoveryCodeReqT
  >({
    mutationFn: async (req) => {
      const response = await fetchClient.post<RecoveryCodedResT>(
        "/api/auth/reset",
        req,
      );

      return response.data;
    },
  });

  useEffect(() => {
    if (!req.email || !req.code) return;

    getRecoveryCodeQuery.mutate(req as RecoveryCodeReqT);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { getRecoveryCodeQuery };
};
