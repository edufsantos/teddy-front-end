import { motion } from 'motion/react';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router';

import { ROUTES } from '@/shared/constants/routes';
import { useAuth } from '../context/auth-context';

const AuthBaseLayout = () => {
  const { isAuthenticated } = useAuth();
  const { state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(state?.from ?? ROUTES.CUSTOMERS.fullPath, { replace: true });
    }
  }, [isAuthenticated, navigate, state?.from]);

  return (
    <div className='w-full min-h-screen bg-gray-100 flex items-center justify-center overflow-hidden'>
      <motion.div
        className='flex items-center justify-center w-full h-full'
        key={location.pathname}
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -100 }}
        transition={{
          duration: 0.5,
          ease: 'easeInOut',
        }}
      >
        <Outlet />
      </motion.div>
    </div>
  );
};

AuthBaseLayout.displayName = 'AuthBaseLayout';

export { AuthBaseLayout };
