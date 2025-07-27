'use client';

import { useState, useEffect } from 'react';
import SessionExpiredDialog from '@/components/dialog/SessionExpiredDialog';
import GenericDialog from '@/components/dialog/GenericDialog';


export function SessionExpiredProvider({ children }: { children: React.ReactNode }) {
  const [isExpired, setIsExpired] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleSessionExpired = () => {
      console.log('[SessionExpiredContext] Received session-expired event');
      setIsExpired(true);
    };

    // Listen for session-expired event from the window
    const handleGlobalError  = (event: CustomEvent) => {
        console.log('[SessionExpiredContext] Received 400 error event:', event.detail);
        setErrorMessage(event.detail);
    }

    window.addEventListener('session-expired', handleSessionExpired);
    window.addEventListener('400-error', handleGlobalError  as EventListener);

    return () => {
      window.removeEventListener('session-expired', handleSessionExpired);
        window.removeEventListener('400-error', handleGlobalError as EventListener);

    };
  }, []);

  return (
    <>
        {children}
        {isExpired && <SessionExpiredDialog />}
        
        {errorMessage && (
        <GenericDialog
            variant="error"
            open={true}
            title="Something went wrong"
            description={errorMessage}
            onClose={() => setErrorMessage(null)}
        />    
        )}
    </>
  );
}
