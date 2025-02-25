import { manageUserOrderDepsContext } from "@/features/manage-user-orders";
import { Tariff } from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const ManageUserOrderProvider = ({
  children,
  tariffs,
}: {
  children?: React.ReactNode;
  tariffs: Tariff[];
}) => {
  return (
    <manageUserOrderDepsContext.Provider
      value={{
        getTariffs: () =>
          tariffs.map((tariff) => ({
            value: tariff.id.toString(),
            label: tariff.name,
          })),
      }}
    >
      {children}
    </manageUserOrderDepsContext.Provider>
  );
};
