'use client';

import { useState, useCallback, ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { Lock, RectangleEllipsis } from 'lucide-react';

interface CvcInputProps {
  value: string;
  onChange: (value: string) => void;
  cardNumber?: string; // Optional: to adjust maxLength based on card type
}

const getMaxCvcLength = (cardNumber?: string): number => {
  if (!cardNumber) return 3;
  const digits = cardNumber.replace(/\D/g, '');
  return /^3[47]/.test(digits) ? 4 : 3; // Amex: 4 digits, others: 3
};

export default function CvcInput({
  value,
  onChange,
  cardNumber,
  placeholder = '123',
  className,
  ...props
}: ComponentProps<'input'> & CvcInputProps) {
  const [displayValue, setDisplayValue] = useState(value);
  const maxLength = getMaxCvcLength(cardNumber);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value.replace(/\D/g, '').slice(0, maxLength);
      setDisplayValue(input);
      onChange?.(input);
    },
    [onChange, maxLength]
  );

  return (
    <div className='relative'>
      <Input
        type='text'
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={className}
        maxLength={maxLength}
        inputMode='numeric'
        pattern='[0-9]*'
        {...props}
      />
      <RectangleEllipsis
        className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500'
        aria-hidden='true'
      />
    </div>
  );
}
