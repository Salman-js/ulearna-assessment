'use client';
import { useState } from 'react';
import { Lens } from '@/components/ui/lens';
import Image from 'next/image';

export default function ProductImage({
  imageSrc,
  alt,
}: {
  imageSrc: string;
  alt?: string;
}) {
  const [hovering, setHovering] = useState(false);

  return (
    <div>
      <div className='w-full relative overflow-hidden'>
        <div className='relative z-10'>
          <Lens hovering={hovering} setHovering={setHovering} lensSize={250}>
            <Image
              src={imageSrc}
              alt={alt ?? ''}
              width={400}
              height={800}
              priority
              className='w-full size-full object-cover'
            />
          </Lens>
        </div>
      </div>
    </div>
  );
}
