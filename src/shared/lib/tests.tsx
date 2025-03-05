import "@/app/styles/index.scss";
import { MantineProvider } from "@mantine/core";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react";
import { ReactNode } from "react";
import { mantineTheme } from "@/config/theme/mantineTheme.config";

import { GrpcClientsProvider } from "../grpc/GrpcClientProvider";
import { TranslationProvider } from "../locale/translations";

export interface componentRenderOptions {
  locale?: string;
  dictionary?: Record<string, string>;
  queryClient?: QueryClient;
}

interface TestProviderProps {
  children: ReactNode;
  options: componentRenderOptions;
}

export const TestProvider = (props: TestProviderProps) => {
  const { children } = props;
  const { locale, dictionary, queryClient = new QueryClient() } = props.options;

  return (
    <QueryClientProvider client={queryClient}>
      <TranslationProvider locale={locale} dictionary={dictionary}>
        <GrpcClientsProvider>
          <MantineProvider theme={mantineTheme}>{children}</MantineProvider>
        </GrpcClientsProvider>
      </TranslationProvider>
    </QueryClientProvider>
  );
};

export function componentRender(component: ReactNode) {
  return render(<TestProvider>{component}</TestProvider>);
}
