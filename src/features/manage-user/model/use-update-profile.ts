import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAccessClient } from "@/shared/grpc/clients/use-user-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  UpdateUserProfileRequest,
  UpdateUserProfileResponse,
} from "@/shared/proto/api_tips_access/v1/api_tips_access";

export const useUpdateUserProfile = () => {
  const { updateUserProfile } = useAccessClient();
  const queryClient = useQueryClient();

  return useMutation<
    UpdateUserProfileResponse,
    unknown,
    UpdateUserProfileRequest
  >({
    mutationFn: async (req) => {
      const response = await updateUserProfile(req);

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.DETAILED_USER] });
    },
  });
};
