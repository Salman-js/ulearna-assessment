'use client';

import { useState, useTransition } from 'react';
import { notEmpty, purge, seed } from '../constants/seed';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';

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
        toast.success('Data generated successfully!');
        queryClient.clear();
        setTimeout(() => {
          setError(null);
          setSuccess(false);
        }, 5000);
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
        toast.success('Data reset successfully!');
        queryClient.clear();
        setTimeout(() => {
          setError(null);
          setSuccess(false);
        }, 5000);
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
