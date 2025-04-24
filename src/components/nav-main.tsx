'use client';

import { type Icon } from '@tabler/icons-react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import { AnimatedLink } from './ui/AnimatedLink';

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: Icon;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarSeparator />
        <SidebarMenu>
          {items.map((item) => (
            <li key={item.title}>
              <AnimatedLink href={item.url} key={item.title}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={
                    pathname === '/'
                      ? item.url === '/'
                      : item.url !== '/' && pathname.includes(item.url)
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </AnimatedLink>
            </li>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
