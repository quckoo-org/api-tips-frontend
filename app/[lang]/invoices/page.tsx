import { Suspense } from "react";
import { InvoicesPage } from "@/screens/invoices-page";

const Invoices = async () => {
  return (
    <Suspense>
      <InvoicesPage />
    </Suspense>
  );
};

export default Invoices;
