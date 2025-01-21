import { Montserrat } from "next/font/google";
import type { Locale } from "@/config/i18n/i18n-config";

const montserrat = Montserrat({ subsets: ["latin"] });

export default async function WelcomeLandingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  return <div className={montserrat.className}>{children}</div>;
}
