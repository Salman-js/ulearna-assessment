import { Separator } from '@/components/ui/separator';
import data from '@/features/product/data.json';
import { IProduct } from '@/features/product/interface/interface.product';
import ProductsGrid from '@/features/product/components/products-grid';
import { ProductBreadCrumbs } from '@/features/product/components/product-breadcrumbs';

export default async function Page() {
  const initialData: IProduct[] = data as any;
  return (
    <div className='@container/main flex flex-col flex-1 p-6 gap-6'>
      <div className='w-full'>
        <ProductBreadCrumbs />
      </div>
      <Separator className='bg-accent' />
      <ProductsGrid products={initialData} />
    </div>
  );
}
