import { getProductById } from '@/api/products.api';
import { BreadCrumbView } from '@/components/breadcrumb-view';
import { Separator } from '@/components/ui/separator';
import ProductOverview from '@/features/product/components/product-overview';
import NotFound from './not-found';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const product = await getProductById(id);
  if (!product) {
    return <NotFound />;
  }
  return (
    <div className='@container/main flex flex-col flex-1 p-6 gap-6'>
      <div className='w-full'>
        <BreadCrumbView
          items={[
            {
              title: 'Home',
              route: '/',
            },
            {
              title: 'Products',
              route: '/products',
            },
            {
              title: product?.name ?? 'Product',
            },
          ]}
        />
      </div>
      <Separator className='bg-accent' />
      <ProductOverview product={product} />
    </div>
  );
}
