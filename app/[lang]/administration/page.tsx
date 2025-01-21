import { Suspense } from "react";
import { AdministrationPage } from "@/screens/administration-page/ui/administration-page";

const Page = async () => {
  return (
    <Suspense>
      <AdministrationPage />
    </Suspense>
  );
};

export default Page;
