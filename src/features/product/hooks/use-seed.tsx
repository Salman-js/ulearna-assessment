'use client';

import { useState, useTransition } from 'react';
import { notEmpty, purge, seed } from '../constants/seed';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';

export function useSeed() {
  const queryClient = useQueryClient();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const handleSeed = async () => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await seed();
        setSuccess(true);
      } catch (err) {
        console.log('Error: ', err);
        toast.error('Error generating data');
        setError(err instanceof Error ? err.message : 'Seeding failed');
      } finally {
        toast('Data Generated Successfully', {
          description: dayjs().format('MMM DD, YYYY'),
        });
        setTimeout(() => {
          setError(null);
          setSuccess(false);
          window.location.reload();
        }, 3000);
      }
    });
  };

  const handlePurge = async () => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await purge();
        setSuccess(true);
      } catch (err) {
        console.log('Error: ', err);
        toast.error('Error purging data');
        setError(err instanceof Error ? err.message : 'Seeding failed');
      } finally {
        toast('Data Reset Successfully', {
          description: dayjs().format('MMM DD, YYYY'),
        });
        setTimeout(() => {
          setError(null);
          setSuccess(false);
          window.location.reload();
        }, 3000);
      }
    });
  };
  return {
    isPending,
    seed: handleSeed,
    purge: handlePurge,
    error,
    success,
  };
}
