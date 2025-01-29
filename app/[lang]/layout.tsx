import "@mantine/core/styles.css";
import "./globals.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";
import { Roboto } from "next/font/google";
import { Provider } from "@/app/providers/provider";
import { UiProvider } from "@/app/providers/ui-provider";
import { i18n, type Locale } from "@/config/i18n/i18n-config";
import { getDictionary } from "@/shared/locale/getDictionary";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

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
      <body className={`${roboto.className} antialiased`}>
        <Provider dictionary={dictionary} locale={lang}>
          <UiProvider lang={lang}>{children}</UiProvider>
        </Provider>
      </body>
    </html>
  );
}
