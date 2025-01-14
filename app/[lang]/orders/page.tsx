import { Suspense } from "react";
import { AuthProvider } from "@/features/auth/ui/auth-provider";
import { OrdersPage } from "@/screens/orders-page";

const UserRegistry = async () => {
  return (
    <AuthProvider>
      <Suspense>
        <OrdersPage />
      </Suspense>
    </AuthProvider>
  );
};

export default UserRegistry;
