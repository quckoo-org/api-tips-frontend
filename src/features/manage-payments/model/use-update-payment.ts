import { useMutation, useQueryClient } from "@tanstack/react-query";
import { usePaymentClient } from "@/shared/grpc/clients/use-payment-client";
import { QUERY_KEYS } from "@/shared/lib";
import {
  GetAllPaymentsResponse,
  UpdatePaymentRequest,
} from "@/shared/proto/api_tips_payment/v1/api_tips_payment";

export const useUpdatePayment = () => {
  const { updatePayment } = usePaymentClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (req: UpdatePaymentRequest) => {
      const response = await updatePayment(req);

      return response;
    },
    onSuccess: (paymentResponse) => {
      queryClient.setQueriesData<GetAllPaymentsResponse>(
        { queryKey: [QUERY_KEYS.PAYMENTS] },
        (oldData) => {
          if (!oldData) return oldData;

          return {
            ...oldData,
            payments: oldData.payments.map((payment) =>
              payment.id === paymentResponse.payment?.id &&
              paymentResponse.payment !== undefined
                ? paymentResponse.payment
                : payment,
            ),
          };
        },
      );
    },
  });
};
