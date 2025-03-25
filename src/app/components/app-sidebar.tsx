import { NavLink, useLocation } from 'react-router';

import logo from '@/assets/logo-teddy.png';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/shared/components/ui/sidebar';
import { ROUTES } from '@/shared/constants/routes';

import { Home, LayoutGrid, User } from 'lucide-react';

const AppSidebar = () => {
  const location = useLocation();

  const items = [
    {
      title: 'Home',
      url: ROUTES.HOME.fullPath,
      icon: Home,
    },
    {
      title: 'Clientes',
      url: ROUTES.CUSTOMERS.fullPath,
      icon: User,
    },
    {
      title: 'Produtos',
      url: ROUTES.PRODUCTS.fullPath,
      icon: LayoutGrid,
    },
  ];

  return (
    <>
      <Sidebar
        className='rounded-tr-2xl rounded-br-2xl overflow-hidden'
        collapsible='offcanvas'
      >
        <SidebarHeader className='bg-gray-700'>
          <SidebarGroup>
            <SidebarGroupContent className='flex gap-2'>
              <div className='flex w-full justify-center items-center space-x-2 h-[128px]'>
                <img src={logo} alt='Teddy Logo' className='h-12' />
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu className='gap-2'>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={location.pathname.startsWith(item.url)}
                    >
                      <NavLink to={item.url}>
                        <item.icon />
                        <span className='ml-4'>{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </>
  );
};

export { AppSidebar };
