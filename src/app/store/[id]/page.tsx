import { BreadCrumbView } from '@/components/breadcrumb-view';
import { IProduct } from '@/features/product/interface/interface.product';
import data from '@/features/product/data.json';
import { Separator } from '@/components/ui/separator';
import ProductOverview from '@/features/product/components/product-overview';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products: IProduct[] = data as any;
  const product = products.find((product) => product.id === id);
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
              route: '/store',
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
