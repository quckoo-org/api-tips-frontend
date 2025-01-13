import { Container } from "@mantine/core";
import "@mantine/core/styles.css";
import localFont from "next/font/local";
import "./globals.css";
import "@mantine/dates/styles.css";

import { Provider } from "@/app/providers/provider";
import { i18n, type Locale } from "@/config/i18n/i18n-config";
import { getDictionary } from "@/shared/locale/getDictionary";
import Header from "@/shared/ui/Header";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}>) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider dictionary={dictionary} locale={lang}>
          <Header />
          <Container className="p-4" size="xl">
            {children}
          </Container>
        </Provider>
      </body>
    </html>
  );
}
