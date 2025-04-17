'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../hooks/use-cart';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { orderSchema } from '@/features/order/schema/schema.order';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { CreditCard } from 'lucide-react';
import NumberFlow from '@number-flow/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useId } from 'react';
import { usePaymentInputs } from 'react-payment-inputs';
import images, { type CardImages } from 'react-payment-inputs/images';

function Checkout() {
  const { totalPrice } = useCart();
  const id = useId();
  const {
    meta,
    getCardNumberProps,
    getExpiryDateProps,
    getCVCProps,
    getCardImageProps,
  } = usePaymentInputs();
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
  function onSubmit(values: FormValues) {
    console.log(values);
  }
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
        'max-h-[32rem]'
      )}
    >
      <div className='flex items-center gap-2 mb-3'>
        <CreditCard className='w-4 h-4 text-zinc-500' />
        <h2 className='text-sm font-medium text-zinc-900 dark:text-zinc-100'>
          Confirm and Pay
        </h2>
      </div>
      <motion.div
        className={cn(
          'flex-1 overflow-y-auto',
          'min-h-0',
          '-mx-4 px-4',
          'space-y-3'
        )}
      >
        <AnimatePresence initial={false} mode='popLayout'>
          <label className='border-input has-data-[state=checked]:border-primary/50 has-focus-visible:border-ring has-focus-visible:ring-ring/50 relative flex cursor-pointer flex-col gap-1 rounded-md border px-4 py-3 shadow-xs transition-[color,box-shadow] outline-none has-focus-visible:ring-[3px]'>
            <p className='text-foreground text-sm font-medium'>Total</p>
            <motion.span
              layout
              className='text-sm font-semibold text-zinc-900 dark:text-zinc-100'
            >
              <NumberFlow value={totalPrice} />
            </motion.span>
          </label>
        </AnimatePresence>
      </motion.div>
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
                  <Input
                    className='peer rounded-b-none pe-9 shadow-none [direction:inherit]'
                    {...getCardNumberProps()}
                  />
                  <div className='text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50'>
                    {meta.cardType ? (
                      <svg
                        className='overflow-hidden rounded-sm'
                        {...getCardImageProps({
                          images: images as unknown as CardImages,
                        })}
                        width={20}
                      />
                    ) : (
                      <CreditCard size={16} aria-hidden='true' />
                    )}
                  </div>
                </div>
                <div className='-mt-px flex'>
                  <div className='min-w-0 flex-1 focus-within:z-10'>
                    <Input
                      className='rounded-e-none rounded-t-none shadow-none [direction:inherit]'
                      {...getExpiryDateProps()}
                    />
                  </div>
                  <div className='-ms-px min-w-0 flex-1 focus-within:z-10'>
                    <Input
                      className='rounded-s-none rounded-t-none shadow-none [direction:inherit]'
                      {...getCVCProps()}
                    />
                  </div>
                </div>
              </div>
            </div>
            <Button size='sm' className='w-full gap-2' type='submit'>
              <CreditCard className='w-4 h-4' />
              Pay now
            </Button>
          </form>
        </Form>
      </motion.div>
    </motion.div>
  );
}

export default Checkout;
