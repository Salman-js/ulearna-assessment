import { IProduct } from '../interface/interface.product';
import { useFetchQuery } from '@/hooks/query.hooks';

export function useFetchProducts(initialData: IProduct[]) {
  return useFetchQuery<IProduct[]>(
    '/api/products',
    ['products'],
    {},
    initialData
  );
}
