'use client';

import * as React from 'react';
import {
  IconBuildingStore,
  IconDashboard,
  IconInnerShadowTop,
} from '@tabler/icons-react';

import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import Link from 'next/link';

const data = {
  user: {
    name: 'Salman M.',
    email: 'salmanmoh.eth@gmail.com',
    avatar: 'nopicture',
  },
  navMain: [
    {
      title: 'Dashboard',
      url: '/',
      icon: IconDashboard,
    },
    {
      title: 'Products',
      url: '/products',
      icon: IconBuildingStore,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5'
            >
              <Link href='/'>
                <IconInnerShadowTop className='!size-5' />
                <span className='text-base font-semibold'>Ulearna Store</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
