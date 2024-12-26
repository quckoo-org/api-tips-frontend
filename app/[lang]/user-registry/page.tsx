import { Suspense } from "react";
import { AuthProvider } from "@/features/auth/ui/auth-provider";
import { UserRegistryPage } from "@/screens/user-registry-page";

const UserRegistry = async () => {
  return (
    <AuthProvider>
      <Suspense>
        <UserRegistryPage />
      </Suspense>
    </AuthProvider>
  );
};

export default UserRegistry;
