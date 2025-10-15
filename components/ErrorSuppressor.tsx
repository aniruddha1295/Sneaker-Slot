'use client';

import { useEffect } from 'react';

export function ErrorSuppressor() {
  useEffect(() => {
    // Suppress hydration warnings in development
    const originalError = console.error;
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('Hydration') ||
          args[0].includes('hydration') ||
          args[0].includes('did not match') ||
          args[0].includes('data-darkreader'))
      ) {
        // Suppress hydration errors caused by browser extensions
        return;
      }
      originalError.apply(console, args);
    };

    // Handle wallet extension errors gracefully
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' &&
        (args[0].includes('default wallet') ||
          args[0].includes('pageProvider'))
      ) {
        // Suppress wallet extension warnings
        return;
      }
      originalWarn.apply(console, args);
    };

    // Catch unhandled promise rejections from wallet extensions
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (
        event.reason?.message?.includes('Failed to fetch') ||
        event.reason?.message?.includes('wallet')
      ) {
        event.preventDefault();
        console.log('Wallet connection error suppressed:', event.reason);
      }
    };

    window.addEventListener('unhandledrejection', handleRejection);

    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      window.removeEventListener('unhandledrejection', handleRejection);
    };
  }, []);

  return null;
}
