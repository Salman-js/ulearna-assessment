import { Separator } from '@/components/ui/separator';
import ProductItem from '@/features/product/components/product-item';
import data from '@/features/product/data.json';
import { z } from 'zod';
import { productSchema } from '@/features/product/schema/schema.product';
import { IProduct } from '@/features/product/interface/interface.product';
import ProductsGrid from '@/features/product/components/products-grid';

export default function Page() {
  const initialData: IProduct[] = data as any;
  return (
    <div className='flex flex-1 flex-col p-6 gap-4'>
      <div className='w-full'>
        <h1 className='font-semibold text-4xl'>Products</h1>
      </div>
      <Separator />
      <div className='@container/main columns-4'>
        <ProductsGrid products={initialData} />
      </div>
    </div>
  );
}
