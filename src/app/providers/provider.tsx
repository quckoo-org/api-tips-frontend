"use client";

import { MantineProvider } from "@mantine/core";
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import { FC, ReactNode, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Locale } from "@/config/i18n/i18n-config";
import { mantineTheme } from "@/config/theme/mantineTheme.config";
import { AuthProvider } from "@/features/auth/ui/auth-provider";
import ErrorPage from "@/screens/error-page/error-page";
import { ServerError } from "@/shared/grpc/errorMiddleware";
import { GrpcClientsProvider } from "@/shared/grpc/GrpcClientProvider";
import { getDictionary } from "@/shared/locale/getDictionary";
import { TranslationProvider } from "@/shared/locale/translations";

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
  // Create a client
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            retry: 1,
            refetchOnWindowFocus: false,
          },
        },
        queryCache: new QueryCache({
          onError: (e, query) => {
            if (
              e instanceof ServerError &&
              query.meta?.message &&
              e.status === query.meta.status
            ) {
              const error = e as ServerError;
              toast.error(() => <div>{error.statusDescription}</div>, {
                id: "queryDeltaServerError" + error.message,
                duration: 5000,
              });

              return;
            }

            if (e instanceof ServerError) {
              const error = e as ServerError;
              toast.error(() => <div>{error.statusDescription}</div>, {
                id: "queryDeltaServerError" + error.message,
                duration: 5000,
              });
            }
          },
        }),
        mutationCache: new MutationCache({
          onError: (e) => {
            if (e instanceof ServerError) {
              const error = e as ServerError;
              toast.error(() => <div>{error.statusDescription}</div>, {
                id:
                  "mutationDeltaServerError" +
                  error.message +
                  error.statusDescription,
                duration: 5000,
              });
            }
          },
        }),
      }),
  );

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TranslationProvider locale={locale} dictionary={dictionary}>
          <GrpcClientsProvider>
            <MantineProvider theme={mantineTheme}>
              <ErrorBoundary errorComponent={ErrorPage}>
                <AuthProvider>{children}</AuthProvider>
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
