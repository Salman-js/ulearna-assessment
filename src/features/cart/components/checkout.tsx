'use client';

import { motion } from 'framer-motion';
import { useCart } from '../hooks/use-cart';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema } from '@/features/order/schema/schema.order';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreditCard, Loader2, X } from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import CreditCardInput from './credit-card-input';
import ExpiryDateInput from './expiry-date-input';
import CvcInput from './cvc-input';
import { useCreateOrder } from '@/features/order/api/api.orders';
import { useEffect } from 'react';

function Checkout() {
  const { totalPrice, items, openCart, setLoading } = useCart();
  type FormValues = z.infer<typeof orderSchema>;
  const form = useForm<FormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      name: '',
      address: '',
      cardNumber: '',
      cvv: '',
      expirationDate: '',
    },
  });
  const itemsCount = items.length;
  const { mutateAsync, isPending } = useCreateOrder();
  function onSubmit(values: FormValues) {
    mutateAsync({
      items,
    });
  }
  useEffect(() => {
    setLoading(isPending);
  }, [isPending]);
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className={cn(
        'w-80 flex flex-col',
        'p-4 rounded-xl',
        'bg-white dark:bg-zinc-900',
        'border border-zinc-200 dark:border-zinc-800',
        'sticky top-4',
        'max-h-[44rem]'
      )}
    >
      <div className='flex items-center gap-2 mb-3'>
        <CreditCard className='w-4 h-4 text-zinc-500' />
        <h2 className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
          Confirm and Pay
        </h2>
      </div>
      <div className=''>
        <label className='border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]'>
          <p className='text-foreground text-sm font-medium'>Total</p>
          <motion.span
            layout
            className='text-lg font-semibold text-zinc-900 dark:text-zinc-100'
          >
            <span className='text-sm mr-1'>$</span>
            <NumberFlow value={totalPrice} />
          </motion.span>
        </label>
      </div>
      <motion.div
        layout
        className={cn(
          'pt-3 mt-3',
          'border-t border-zinc-200 dark:border-zinc-800',
          'bg-white dark:bg-zinc-900'
        )}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder='' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className='*:not-first:mt-2'>
              <legend className='text-foreground text-sm font-medium'>
                Card Details
              </legend>
              <div className='rounded-md shadow-xs'>
                <div className='relative focus-within:z-10'>
                  <FormField
                    control={form.control}
                    name='cardNumber'
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <CreditCardInput
                            className='peer rounded-b-none pe-9 shadow-none [direction:inherit]'
                            {...field}
                            placeholder='Card Number'
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='-mt-px flex'>
                  <div className='min-w-0 flex-1 focus-within:z-10'>
                    <FormField
                      control={form.control}
                      name='expirationDate'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <ExpiryDateInput
                              className='rounded-e-none rounded-t-none shadow-none [direction:inherit]'
                              {...field}
                              placeholder='Expiry Date'
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className='-ms-px min-w-0 flex-1 focus-within:z-10'>
                    <FormField
                      control={form.control}
                      name='cvv'
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <CvcInput
                              className='rounded-s-none rounded-t-none shadow-none [direction:inherit]'
                              {...field}
                              placeholder='CVC'
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className='w-full flex flex-row gap-2'>
              <Button
                size='icon'
                onClick={openCart}
                variant='outline'
                type='button'
                disabled={isPending}
              >
                <X className='w-4 h-4' />
              </Button>
              <Button
                className='flex-1 gap-2'
                type='submit'
                disabled={itemsCount === 0 || isPending}
              >
                {isPending ? (
                  <Loader2 className='w-4 h-4 animate-spin' />
                ) : (
                  <CreditCard className='w-4 h-4' />
                )}
                {isPending ? 'Processing...' : 'Pay'}
              </Button>
            </div>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
}

export default Checkout;
