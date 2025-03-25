import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { LoggerProvider } from '@/shared/context/logger-context';

import {
  ConfigContext,
  ConfigProvider,
} from '../shared/context/config-context';
import { HttpClientProvider } from './context/http-client-context';
import { ServicesProvider } from './context/services-context';
import { ThemeProvider } from './context/theme-context';
import { AppRouter } from './router/app-router';
import { AuthProvider } from '@/features/auth/context/auth-context';
import { Toaster } from '@/shared/components/ui/sonner';
import { ModalProvider } from '@/shared/hooks/use-modal';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2, // Number of retries on failure
      refetchOnWindowFocus: false, // Disable refetching when the window is focused
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

const App = () => {
  return (
    <ConfigProvider env={import.meta.env}>
      <LoggerProvider>
        <ConfigContext.Consumer>
          {(configService) => {
            const httpClientConfig = {
              baseURL: configService!.getBaseUrl(),
              timeout: configService!.getApiTimeout(),
            };

            return (
              <HttpClientProvider config={httpClientConfig}>
                <ServicesProvider>
                  <QueryClientProvider client={queryClient}>
                    <AuthProvider>
                      <ThemeProvider>
                        <ModalProvider>
                          <AppRouter />
                        </ModalProvider>
                      </ThemeProvider>
                    </AuthProvider>
                    {/* Conditionally render DevTools in development environment */}
                    {configService!.getAppEnvironment() === 'development' && (
                      <ReactQueryDevtools initialIsOpen={false} />
                    )}
                  </QueryClientProvider>
                </ServicesProvider>
              </HttpClientProvider>
            );
          }}
        </ConfigContext.Consumer>
      </LoggerProvider>
      <Toaster richColors />
    </ConfigProvider>
  );
};

export { App };
