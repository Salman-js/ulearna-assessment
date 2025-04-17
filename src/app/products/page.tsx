import { Separator } from '@/components/ui/separator';
import ProductsGrid from '@/features/product/components/products-grid';
import { ProductBreadCrumbs } from '@/features/product/components/product-breadcrumbs';
import { getProducts } from '../api/products/route';

export default async function Page() {
  const initialData = await getProducts();
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
