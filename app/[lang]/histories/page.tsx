import { Suspense } from "react";
import { AuthProvider } from "@/features/auth/ui/auth-provider";
import { HistoriesPage } from "@/screens/histories-page";

const Histories = async () => {
  return (
    <AuthProvider>
      <Suspense>
        <HistoriesPage />
      </Suspense>
    </AuthProvider>
  );
};

export default Histories;
