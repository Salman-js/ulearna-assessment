'use client';

import { IProduct } from '@/features/product/interface/interface.product';
import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import ProductImage from './product-image';
import {
  ColorVariant,
  SizeVariant,
  ViewVariant,
} from '@/interface/interface.global';
import ProductDescription from './product-description';
import { cn } from '@/lib/utils';
import { SizeToggle } from './size-toggle';
import { IconMinus, IconPlus, IconShoppingCartPlus } from '@tabler/icons-react';
import { Button } from '@/components/ui/button';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/features/cart/hooks/use-cart';
import { NewProductVariantOrder } from '@/features/order/interface/interface.order';

export default function ProductOverview({
  product,
}: {
  product: IProduct | null;
}) {
  const { addToCart } = useCart();
  const { name, defaultVariant, shortDescription, longDescription, views } =
    product ?? {};
  const [view, setView] = useState<ViewVariant>('front');
  const [selectedVariant, setSelectedVariant] = useState<{
    color?: ColorVariant;
    size?: SizeVariant;
  }>({
    color: defaultVariant?.color,
    size: defaultVariant?.size,
  });
  const [quantity, setQuantity] = useState<number>(1);
  const price = useMemo(
    () =>
      Number(
        product?.variants.find(
          (variant) =>
            variant.color === selectedVariant?.color &&
            variant.size === selectedVariant?.size
        )?.price ?? 0
      ) * quantity,
    [selectedVariant, quantity]
  );
  useEffect(() => {
    if (product) {
      setSelectedVariant({
        color: defaultVariant?.color,
        size: defaultVariant?.size,
      });
    }
  }, [product]);
  const colorOptions: ColorVariant[] = ['black', 'white', 'gray'];
  const handleSelectColor = (color: ColorVariant) => {
    setSelectedVariant({
      ...selectedVariant,
      color,
    });
  };
  const handleAddQuantity = () => {
    setQuantity(quantity + 1);
  };
  const handleRemoveQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  const handleSelectView = (vw: 'front' | 'back' | 'left' | 'right') => {
    setView(vw);
  };
  const handleAddToCart = () => {
    const currentVariant = product?.variants.find(
      (variant) =>
        variant.color === selectedVariant?.color &&
        variant.size === selectedVariant?.size
    );
    if (currentVariant && product) {
      const newCartItem: NewProductVariantOrder = {
        id: Math.random().toString(),
        price: currentVariant?.price ?? 0,
        productId: currentVariant?.id,
        quantity,
        size: currentVariant?.size,
        color: currentVariant?.color,
        productName: product?.name,
      };
      addToCart(newCartItem);
    }
  };
  return (
    <div className='w-full lg:w-4/5 columns-1 lg:columns-2 md:columns-1 xl:columns-2 mt-4 gap-4'>
      <div className='w-full flex flex-col gap-2'>
        <ProductImage
          imageSrc={`/assets/products/${product?.category}/${selectedVariant?.color}/${view}.png`}
          alt={product?.name ?? ''}
        />
        <div className='w-full flex flex-row justify-center gap-3'>
          {views?.map((vw) => (
            <div
              className={cn(
                'p-[2px] rounded-md border-2',
                view === vw ? 'border-blue-500' : 'border-background'
              )}
              key={vw}
              onClick={() => handleSelectView(vw)}
            >
              <Image
                src={`/assets/products/${product?.category}/${selectedVariant?.color}/${vw}.png`}
                alt={product?.name ?? ''}
                width={756}
                height={756}
                className='rounded-sm'
              />
            </div>
          ))}
        </div>
      </div>
      <div className='w-full flex flex-col items-start gap-2 py-10'>
        <h2 className='text-4xl font-semibold'>{name}</h2>
        <h3 className='text-3xl font-light'>${price}</h3>
        <h3 className='text-2xl font-light mt-6 mb-4'>{shortDescription}</h3>
        <ProductDescription description={longDescription} />
        <div className='variant-selector w-full flex flex-col gap-4 mt-2'>
          <div className='variant-selector'>
            <h3 className='text-accent-foreground font-semibold text-lg mb-1'>
              Color
            </h3>
            <div className='w-full flex flex-row gap-2'>
              {colorOptions.map((color) => (
                <div
                  className={cn(
                    'rounded-full p-[2px] flex flex-col justify-center items-center border-accent-foreground',
                    selectedVariant?.color === color && 'border-2'
                  )}
                  key={color}
                >
                  <button
                    className={cn(
                      `p-5 rounded-full border-1`,
                      color === 'gray'
                        ? 'bg-[#929292]'
                        : color === 'white'
                        ? 'bg-[#ffffff]'
                        : 'bg-black'
                    )}
                    onClick={() => handleSelectColor(color)}
                  ></button>
                </div>
              ))}
            </div>
          </div>
          <div className='variant-selector'>
            <h3 className='text-accent-foreground font-semibold text-lg mb-1'>
              Size
            </h3>
            <div className='w-full flex flex-row gap-2'>
              <SizeToggle />
            </div>
          </div>
          <div className='flex flex-row items-end gap-3'>
            <div className='variant-selector'>
              <h3 className='text-accent-foreground font-semibold text-lg mb-1'>
                Quantity
              </h3>
              <div className='w-full flex flex-row gap-2 items-center'>
                <Button
                  className=''
                  variant='outline'
                  onClick={handleRemoveQuantity}
                >
                  <IconMinus />
                </Button>
                <span className='mx-2 text-lg font-bold'>{quantity}</span>
                <Button
                  className=''
                  variant='outline'
                  onClick={handleAddQuantity}
                >
                  <IconPlus />
                </Button>
              </div>
            </div>
            <Button className='flex-1' onClick={handleAddToCart}>
              <IconShoppingCartPlus /> Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
