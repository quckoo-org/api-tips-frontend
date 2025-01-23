import { Suspense } from "react";
import { PaymentsPage } from "@/screens/payments-page";

const Page = async () => {
  return (
    <Suspense>
      <PaymentsPage />
    </Suspense>
  );
};

export default Page;
