import { Suspense } from "react";
import { UserRegistryPage } from "@/screens/user-registry-page";

const UserRegistry = async () => {
  return (
    <Suspense>
      <UserRegistryPage />
    </Suspense>
  );
};

export default UserRegistry;
