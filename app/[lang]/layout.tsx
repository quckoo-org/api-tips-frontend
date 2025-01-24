import "@mantine/core/styles.css";
import "./globals.css";
import "@mantine/dates/styles.css";
import { Inter, Montserrat } from "next/font/google";
import { Provider } from "@/app/providers/provider";
import { UiProvider } from "@/app/providers/ui-provider";
import { i18n, type Locale } from "@/config/i18n/i18n-config";
import { getDictionary } from "@/shared/locale/getDictionary";

const inter = Inter({ subsets: ["latin"] });

const montserrat = Montserrat({ subsets: ["latin"] });

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

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
        className={`${inter.className} ${montserrat.className} antialiased`}
      >
        <Provider dictionary={dictionary} locale={lang}>
          <UiProvider lang={lang}>{children}</UiProvider>
        </Provider>
      </body>
    </html>
  );
}
