import { BreadCrumbView } from '@/components/breadcrumb-view';

export function ProductBreadCrumbs() {
  return (
    <BreadCrumbView
      items={[
        {
          title: 'Home',
          route: '/',
        },
        {
          title: 'Store',
        },
        {
          title: 'Products',
        },
      ]}
    />
  );
}
