"use client";

import { mantineTheme } from "@/config/theme/mantineTheme.config";
import ErrorPage from "@/screens/error-page/error-page";
import { GrpcClientsProvider } from "@/shared/grpc/GrpcClientProvider";
import { TranslationProvider } from "@/shared/locale/translations";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { getDictionary } from "@/shared/locale/getDictionary";
import { FC, ReactNode, useState } from "react";
import { Toaster } from "react-hot-toast";
import { Locale } from "@/config/i18n/i18n-config";

type ProviderProps = {
  children: ReactNode;
  locale: Locale;
  dictionary: Awaited<ReturnType<typeof getDictionary>>;
};

export const Provider: FC<ProviderProps> = ({
  children,
  locale,
  dictionary,
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TranslationProvider locale={locale} dictionary={dictionary}>
          <GrpcClientsProvider>
            <MantineProvider theme={mantineTheme}>
              <ErrorBoundary errorComponent={ErrorPage}>
                {children}
              </ErrorBoundary>
              {process.env.NODE_ENV === "development" && (
                <ReactQueryDevtools initialIsOpen={false} />
              )}
            </MantineProvider>
          </GrpcClientsProvider>
        </TranslationProvider>
      </QueryClientProvider>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  );
};