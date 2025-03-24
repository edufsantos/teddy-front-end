import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router';

import { ROUTES } from '@/shared/constants/routes';

import { useAuth } from '@/features/auth/context/auth-context';
import { AuthBaseLayout } from '@/features/auth/components/auth-base-layout';
import { CustomerPage } from '@/features/customers/pages/customers';
import { LoginPage } from '@/features/auth/pages/login';
import { Layout } from '../components/layout';
import ProtectedRoute from './protected-route';

const AppRouter: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route element={<AuthBaseLayout />}>
          <Route path={ROUTES.LOGIN.relativePath} element={<LoginPage />} />
        </Route>
        {/* Protected Routes (require authentication) */}
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!isAuthenticated}
              redirectPath={ROUTES.LOGIN.fullPath}
            />
          }
        >
          <Route element={<Layout />}>
            <Route
              index
              element={<Navigate replace to={ROUTES.CUSTOMERS.fullPath} />}
            />
            <Route
              path={ROUTES.CUSTOMERS.relativePath}
              element={<CustomerPage />}
            />

            <Route path='*' element={<p>There's nothing here: 404!</p>} />
          </Route>
        </Route>
        {/* Catch-all route */}
        <Route
          path='*'
          element={<Navigate to={ROUTES.CUSTOMERS.fullPath} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export { AppRouter };
