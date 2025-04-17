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

const isValidExpiry = (value: string): boolean => {
  const digits = value.replace(/\D/g, '');
  if (digits.length !== 4) return true; // Incomplete, don't validate yet
  const month = parseInt(digits.slice(0, 2), 10);
  const year = parseInt(digits.slice(2), 10);
  const currentYear = new Date().getFullYear() % 100; // e.g., 25 for 2025
  const currentMonth = new Date().getMonth() + 1; // 1-12
  return (
    month >= 1 &&
    month <= 12 &&
    year >= currentYear &&
    (year > currentYear || month >= currentMonth)
  );
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
