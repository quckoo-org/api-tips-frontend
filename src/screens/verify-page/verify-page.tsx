"use client";

import { useVerifyUser } from "@/features/auth";

const VerifyPage = () => {
  useVerifyUser();

  return (
    <div className="flex justify-center items-center min-h-screen">
      Verifying...
    </div>
  );
};

export default VerifyPage;
