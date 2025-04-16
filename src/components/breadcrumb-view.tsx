import { Slash } from 'lucide-react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import React from 'react';
export type BreadCrumbItem = {
  title: string;
  route?: string;
};
export function BreadCrumbView({ items }: { items: BreadCrumbItem[] }) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) =>
          index + 1 !== items.length ? (
            <React.Fragment key={index}>
              <BreadcrumbItem key={index}>
                <BreadcrumbLink href={item.route}>{item.title}</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <Slash />
              </BreadcrumbSeparator>
            </React.Fragment>
          ) : (
            <BreadcrumbItem key={index}>
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            </BreadcrumbItem>
          )
        )}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
