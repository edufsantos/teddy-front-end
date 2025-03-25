import { Link, Outlet, useNavigate } from 'react-router';

import logo from '@/assets/logo-teddy.png';
import { useAuth } from '@/features/auth/context/auth-context';
import { Button } from '@/shared/components/ui/button';
import { Separator } from '@/shared/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { queryKeys } from '@/shared/constants/query-keys';
import { ROUTES } from '@/shared/constants/routes';
import { useQueryClient } from '@tanstack/react-query';
import { AppSidebar } from './app-sidebar';

const Layout = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    // Change this to a mutation and confirm if this user went out of the app
    localStorage.clear();
    queryClient.setQueryData(queryKeys.users.me(), null);
    navigate(ROUTES.LOGIN.fullPath);
  };

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex items-center justify-between p-4 border-b shadow-sm bg-white'>
          <div className='flex items-center space-x-2'>
            <SidebarTrigger className='-ml-1' />
            <div className='flex items-center space-x-2'>
              <img src={logo} alt='Teddy Logo' className='h-10' />
            </div>
          </div>

          <nav className='flex items-center space-x-6 text-sm font-medium'>
            <Link
              to={ROUTES.CUSTOMERS.fullPath}
              className='text-orange-500 underline'
            >
              Clientes
            </Link>
            <Link
              to={ROUTES.SELECTED_CUSTOMERS.fullPath}
              className='text-orange-500 underline'
            >
              Clientes selecionados
            </Link>
            <Button
              className='text-red-700  m-0 p-0'
              variant='link'
              onClick={() => logout()}
            >
              Sair
            </Button>
          </nav>

          <div className='text-sm text-gray-700'>
            Olá, <span className='font-bold'>{user?.name}</span>!
          </div>
        </header>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <Separator orientation='vertical' className='mr-2 h-4' />
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export { Layout };
