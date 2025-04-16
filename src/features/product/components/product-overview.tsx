'use client';

import { IProduct } from '@/features/product/interface/interface.product';
import { useEffect, useState } from 'react';
import { useDefaultImageColor } from '../hooks/use-image';

export default function ProductOverview({
  product,
}: {
  product: IProduct | undefined;
}) {
  const { name, defaultVariant } = product ?? {};
  const imageColor = useDefaultImageColor();
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    defaultVariant?.image
  );
  useEffect(() => {
    if (product) {
      setSelectedImage(imageColor);
    }
  }, [product]);
  return (
    <div className='columns-1 lg:columns-2 md:columns-2 mt-4 gap-4'>
      <div className='w-full'>
        <img
          src={`/assets/products/${product?.category}/${selectedImage}.png`}
          alt=''
          className='w-full size-full object-cover'
        />
      </div>
      <div className='w-full flex flex-col justify-center items-start gap-2'>
        <span className='text-2xl font-semibold'>{name}</span>
      </div>
    </div>
  );
}
