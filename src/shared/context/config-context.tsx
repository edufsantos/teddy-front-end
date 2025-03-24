/* eslint-disable react-refresh/only-export-components */
import React, { createContext, ReactNode, useContext, useRef } from 'react';
import { z } from 'zod';

const ConfigSchema = z.object({
  VITE_API_BASE_URL: z.string().url().default('https://api.default.com'),
  VITE_API_TIMEOUT: z.coerce.number().int().positive().default(5000),
  VITE_LOG_LEVEL: z.enum(['debug', 'info', 'warn', 'error']).default('debug'),
  MODE: z.enum(['development', 'production', 'test']).default('development'),
});

export const ConfigContext = createContext<
  | {
      getAppEnvironment: () => 'development' | 'production' | 'test';
      getBaseUrl: () => string;
      getApiTimeout: () => number;
      getLogLevel: () => 'debug' | 'info' | 'warn' | 'error';
    }
  | undefined
>(undefined);

interface ConfigProviderProps {
  env: Record<string, string>;
  children: ReactNode;
}

const ConfigProvider: React.FC<ConfigProviderProps> = ({ env, children }) => {
  // Validate and parse the configuration
  const parsedConfig = ConfigSchema.safeParse(env);

  if (!parsedConfig.success) {
    console.error(
      'Configuration validation failed:',
      parsedConfig.error.format(),
    );
    throw new Error('Invalid configuration');
  }

  const config = parsedConfig.data;

  // Define getter functions to access specific config values
  const getAppEnvironment = () => config.MODE;
  const getBaseUrl = () => config.VITE_API_BASE_URL;
  const getApiTimeout = () => config.VITE_API_TIMEOUT;
  const getLogLevel = () => config.VITE_LOG_LEVEL;

  const value = useRef({
    getAppEnvironment,
    getBaseUrl,
    getApiTimeout,
    getLogLevel,
  }).current;

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

// Custom hook to access configuration functions
const useConfig = () => {
  const config = useContext(ConfigContext);
  if (!config) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return config;
};

export { ConfigProvider, useConfig };
