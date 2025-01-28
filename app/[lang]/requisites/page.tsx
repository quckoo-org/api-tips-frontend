import { Suspense } from "react";
import { RequisitesPage } from "@/screens/requisites-page";

const Page = async () => {
  return (
    <Suspense>
      <RequisitesPage />
    </Suspense>
  );
};

export default Page;
