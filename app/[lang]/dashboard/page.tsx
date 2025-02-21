import { Suspense } from "react";
import { DashboardPage } from "@/screens/dashboard-page";

const Page = async () => {
  return (
    <Suspense>
      <DashboardPage />
    </Suspense>
  );
};

export default Page;
