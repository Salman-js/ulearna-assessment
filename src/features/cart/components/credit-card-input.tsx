'use client';

import { useState, useCallback, ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';

interface CreditCardInputProps {
  value: string;
  onChange: (value: string) => void;
}

const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  const limited = digits.slice(0, 16);
  const formatted = limited.match(/.{1,4}/g)?.join(' ') || limited;
  return formatted;
};

export default function CreditCardInput({
  value,
  onChange,
  placeholder = '1234 5678 9012 3456',
  className,
  ...props
}: ComponentProps<'input'> & CreditCardInputProps) {
  const [displayValue, setDisplayValue] = useState(formatCardNumber(value));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const digits = input.replace(/\D/g, '');
      const formatted = formatCardNumber(digits);
      setDisplayValue(formatted);
      onChange?.(digits);
    },
    [onChange]
  );

  return (
    <div className='relative'>
      <Input
        type='text'
        value={displayValue}
        onChange={handleChange}
        placeholder={placeholder}
        className={`${className}`}
        maxLength={19}
        inputMode='numeric'
        pattern='[0-9\s]*'
        {...props}
      />
      <CreditCard
        className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500'
        aria-hidden='true'
      />
    </div>
  );
}
