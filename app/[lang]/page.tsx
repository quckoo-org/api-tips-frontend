import { Suspense } from "react";
import { WelcomeLandingPage } from "@/screens/welcome-landing-page/welcome-landing-page";

export default function Home() {
  return (
    <Suspense>
      <WelcomeLandingPage />
    </Suspense>
  );
}
