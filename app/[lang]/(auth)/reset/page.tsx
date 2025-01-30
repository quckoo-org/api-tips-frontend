import { Suspense } from "react";
import { ResetPage } from "@/screens/reset-page/reset-page";

const Page = async () => {
  return (
    <Suspense>
      <ResetPage />
    </Suspense>
  );
};

export default Page;
