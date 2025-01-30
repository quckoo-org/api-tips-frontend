import { menageOrderDepsContext } from "@/features/manage-order";
import { Tariff, User } from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const MenageOrderProvider = ({
  children,
  users,
  tariffs,
}: {
  children?: React.ReactNode;
  tariffs: Tariff[];
  users: User[];
}) => {
  return (
    <menageOrderDepsContext.Provider
      value={{
        getTariffs: () =>
          tariffs.map((tariff) => ({
            value: tariff.id.toString(),
            label: tariff.name,
          })),
        getUsers: () =>
          users.map((user) => ({
            value: user.id.toString(),
            label: user.email,
          })),
      }}
    >
      {children}
    </menageOrderDepsContext.Provider>
  );
};
