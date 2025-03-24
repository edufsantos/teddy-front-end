import { createContext, ReactNode, useContext } from 'react';

import { useHttpClient } from '@/app/context/http-client-context';
import { useLogger } from '@/shared/context/logger-context';
import { CustomerService } from '@/features/customers/services/customer-service';
import { UserService } from '@/features/user/services/user-service';
import { AuthService } from '@/features/auth/services/auth-service';

// Define the shape of the context value
interface ServicesContextProps {
  customerService: CustomerService;
  userService: UserService;
  authService: AuthService;
}

const ServicesContext = createContext<ServicesContextProps | undefined>(
  undefined,
);

export const ServicesProvider = ({ children }: { children: ReactNode }) => {
  const httpClient = useHttpClient();
  const logger = useLogger();

  // Separete the service instantiation from the component rendering, to avoid unnecessary re-renders or dispatch a incorrect context value
  const customerService = new CustomerService(httpClient, logger);
  const userService = new UserService(httpClient, logger);
  const authService = new AuthService(httpClient, logger);

  return (
    <ServicesContext.Provider
      value={{ customerService, userService, authService }}
    >
      {children}
    </ServicesContext.Provider>
  );
};

export const useServices = (): ServicesContextProps => {
  const context = useContext(ServicesContext);
  if (!context) {
    throw new Error('useServices must be used within a ServicesProvider');
  }
  return context;
};
