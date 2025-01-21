import { Suspense } from "react";
import { WelcomeLandingPage } from "@/screens/welcome-landing-page/welcome-landing-page";

const WelcomeLanding = async () => {
  return (
    <Suspense>
      <WelcomeLandingPage />
    </Suspense>
  );
};

export default WelcomeLanding;
