import { Suspense } from "react";
import { AuthProvider } from "@/features/auth/ui/auth-provider";
import { UserOrdersPage } from "@/screens/user-orders-page";

const UserRegistry = async () => {
  return (
    <AuthProvider>
      <Suspense>
        <UserOrdersPage />
      </Suspense>
    </AuthProvider>
  );
};

export default UserRegistry;
