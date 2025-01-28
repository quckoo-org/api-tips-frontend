import { Suspense } from "react";
import { ForgotPasswordPage } from "@/screens/forgot-password-page/forgot-password-page";

const Page = async () => {
  return (
    <Suspense>
      <ForgotPasswordPage />
    </Suspense>
  );
};

export default Page;
