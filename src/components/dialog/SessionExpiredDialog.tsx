'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SessionExpiredDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Mở dialog khi component mount (được gọi từ context)
    setOpen(true);
  }, []);

  const handleLoginRedirect = () => {
    setOpen(false);
    router.push('/auth/login');
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 fixed inset-0 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center space-y-4">
          <div className="flex justify-center">
            <ExclamationTriangleIcon className="w-10 h-10 text-red-500" />
          </div>
          <Dialog.Title className="text-xl font-semibold">
            Session Expired
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300">
            Your login session has expired. Please log in again to continue.
          </Dialog.Description>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleLoginRedirect}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
            >
              Go to Login
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
