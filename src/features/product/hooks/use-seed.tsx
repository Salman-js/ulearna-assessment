'use client';

import { useState, useTransition } from 'react';
import { notEmpty, purge, seed } from '../constants/seed';

export function useSeed() {
  const [isPending, startTransition] = useTransition();
  const [isChecking, startCheckTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [checkError, setCheckError] = useState<string | null>(null);
  const [checkSuccess, setCheckSuccess] = useState<boolean>(false);
  const [hasData, setHasData] = useState<boolean>(false);

  const handleSeed = async () => {
    setError(null);
    setSuccess(false);

    startTransition(async () => {
      try {
        await seed();
        setHasData(true);
        setSuccess(true);
      } catch (err) {
        console.log('Error: ', err);
        setError(err instanceof Error ? err.message : 'Seeding failed');
      } finally {
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
        setHasData(false);
        setSuccess(true);
      } catch (err) {
        console.log('Error: ', err);
        setError(err instanceof Error ? err.message : 'Seeding failed');
      } finally {
        setTimeout(() => {
          setError(null);
          setSuccess(false);
        }, 5000);
      }
    });
  };
  const handleCheck = async () => {
    setCheckError(null);
    setCheckSuccess(false);
    startCheckTransition(async () => {
      try {
        const dbHasData = await notEmpty();
        console.log('Has Data: ', dbHasData, hasData);
        setHasData(dbHasData);
        setCheckSuccess(true);
      } catch (err) {
        console.log('Error: ', err);
        setError(err instanceof Error ? err.message : 'Checking failed');
      } finally {
        setTimeout(() => {
          setCheckError(null);
          setCheckSuccess(false);
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
    hasData,
    isChecking,
    check: handleCheck,
  };
}
