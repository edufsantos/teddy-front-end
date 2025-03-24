/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext, useRef } from 'react';

import { AxiosHttpClient } from '@/shared/http/axios-http-client';
import { HttpClient } from '@/shared/http/http-client';
import { HttpClientConfig } from '@/shared/http/http-client-config';

// Create the context for the HttpClient
const HttpClientContext = createContext<HttpClient | undefined>(undefined);

// Provider component
interface HttpClientProviderProps {
  children: ReactNode;
  config: HttpClientConfig;
}

const HttpClientProvider: React.FC<HttpClientProviderProps> = ({
  children,
  config,
}) => {
  const value = useRef(new AxiosHttpClient(config)).current;

  return (
    <HttpClientContext.Provider value={value}>
      {children}
    </HttpClientContext.Provider>
  );
};

// Custom hook to use HttpClient
const useHttpClient = (): HttpClient => {
  const context = useContext(HttpClientContext);
  if (!context) {
    throw new Error('useHttpClient must be used within an HttpClientProvider');
  }
  return context;
};

export { HttpClientProvider, useHttpClient };
