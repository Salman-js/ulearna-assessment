'use client';

import { useState, useCallback, ComponentProps } from 'react';
import { Input } from '@/components/ui/input';
import { Calendar } from 'lucide-react';

interface ExpiryDateInputProps {
  value: string;
  onChange: (value: string) => void;
}

const formatExpiryDate = (value: string): string => {
  const digits = value.replace(/\D/g, '').slice(0, 4);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
};

export default function ExpiryDateInput({
  value,
  onChange,
  placeholder = 'MM/YY',
  className,
  ...props
}: ComponentProps<'input'> & ExpiryDateInputProps) {
  const [displayValue, setDisplayValue] = useState(formatExpiryDate(value));

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;
      const digits = input.replace(/\D/g, '');
      const formatted = formatExpiryDate(digits);
      setDisplayValue(formatted);
      onChange?.(formatted);
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
        maxLength={5}
        inputMode='numeric'
        pattern='[0-9/]*'
        {...props}
      />
      <Calendar
        className='absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500'
        aria-hidden='true'
      />
    </div>
  );
}
