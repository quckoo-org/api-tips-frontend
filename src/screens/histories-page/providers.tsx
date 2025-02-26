import { balanceDepsContext } from "@/features/balance";
import { User } from "@/shared/proto/api_tips_order/v1/api_tips_order";

export const BalanceProvider = ({
  children,
  users,
}: {
  children?: React.ReactNode;
  users: User[];
}) => {
  return (
    <balanceDepsContext.Provider
      value={{
        getUsers: () =>
          users.map((user) => ({
            value: user.id.toString(),
            label: user.email,
          })),
      }}
    >
      {children}
    </balanceDepsContext.Provider>
  );
};
