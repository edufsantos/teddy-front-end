import { Outlet } from 'react-router';

import { Separator } from '@/shared/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/shared/components/ui/sidebar';
import { AppSidebar } from './app-sidebar';
import logo from '@/assets/logo-teddy.png';
import { useAuth } from '@/features/auth/context/auth-context';

const Layout = () => {
  const { user } = useAuth();
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
            <a href='#' className='text-orange-500 underline'>
              Clientes
            </a>
            <a href='#' className='text-gray-700'>
              Clientes selecionados
            </a>
            <a href='#' className='text-gray-700'>
              Sair
            </a>
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
