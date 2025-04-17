'use client';

import { Component, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useQueryClient } from '@tanstack/react-query';
import { useCart } from '@/features/cart/hooks/use-cart';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode; // Custom fallback UI
  onRetry?: () => void; // Custom retry logic
  onReset?: () => void; // Custom reset logic
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
    error: null,
  };

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console (or send to API)
    console.error('ErrorBoundary caught:', error, errorInfo);

    // Optional: Send to /api/logs
    fetch('/api/logs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        error: error.message,
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      }),
    }).catch((err) => console.error('Failed to log error:', err));
  }

  handleRetry = () => {
    const { onRetry } = this.props;
    if (onRetry) {
      onRetry();
    } else {
      // Default: Invalidate queries to refetch data
      this.queryClient.invalidateQueries();
    }
    this.setState({ hasError: false, error: null });
  };

  handleReset = () => {
    const { onReset } = this.props;
    if (onReset) {
      onReset();
    } else {
      // Default: Clear cart and reset state
      this.cart.clearCart();
    }
    this.setState({ hasError: false, error: null });
  };

  handleRedirect = () => {
    this.router.push('/products');
    this.setState({ hasError: false, error: null });
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.queryClient = useQueryClient();
    this.cart = useCart();
    this.router = useRouter();
  }

  private queryClient: ReturnType<typeof useQueryClient>;
  private cart: ReturnType<typeof useCart>;
  private router: ReturnType<typeof useRouter>;

  render() {
    const { children, fallback } = this.props;
    const { hasError, error } = this.state;

    if (hasError) {
      if (fallback) {
        return fallback;
      }

      return (
        <div className='flex flex-col items-center justify-center min-h-[400px] space-y-4 p-4'>
          <h2 className='text-2xl font-bold text-red-600'>
            Something went wrong
          </h2>
          <p className='text-gray-600'>
            {error?.message || 'An unexpected error occurred.'}
          </p>
          <div className='flex space-x-4'>
            <Button onClick={this.handleRetry} variant='default'>
              Retry
            </Button>
            <Button onClick={this.handleReset} variant='outline'>
              Reset
            </Button>
            <Button onClick={this.handleRedirect} variant='outline'>
              Go to Products
            </Button>
          </div>
        </div>
      );
    }

    return children;
  }
}
