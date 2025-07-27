'use client';

import * as Dialog from '@radix-ui/react-dialog';
import {
  InfoCircledIcon,
  ExclamationTriangleIcon,
  CrossCircledIcon,
} from '@radix-ui/react-icons';
import { JSX, useEffect, useState } from 'react';

type DialogVariant = 'information' | 'warning' | 'error';

const variantConfig: Record<DialogVariant, { icon: JSX.Element; color: string }> = {
  information: {
    icon: <InfoCircledIcon className="w-10 h-10 text-blue-500" />,
    color: 'bg-blue-600 hover:bg-blue-700',
  },
  warning: {
    icon: <ExclamationTriangleIcon className="w-10 h-10 text-yellow-500" />,
    color: 'bg-yellow-500 hover:bg-yellow-600',
  },
  error: {
    icon: <CrossCircledIcon className="w-10 h-10 text-red-500" />,
    color: 'bg-red-600 hover:bg-red-700',
  },
};

export default function GenericDialog({
  title = 'Notification',
  description = '',
  open,
  onClose,
  variant = 'information',
  buttonLabel = 'OK',
  onConfirm,
}: {
  title?: string;
  description?: string;
  open: boolean;
  onClose: () => void;
  variant?: DialogVariant;
  buttonLabel?: string;
  onConfirm?: () => void;
}) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    if (onConfirm) {
      onConfirm();
    }
    setIsOpen(false);
    onClose();
  };

  const { icon, color } = variantConfig[variant];

  return (
    <Dialog.Root open={isOpen} onOpenChange={handleClose} modal={true}>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 backdrop-blur-sm fixed inset-0 z-40 transition-opacity" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#1a1a1a] p-6 rounded-2xl shadow-lg w-[90%] max-w-md text-center space-y-4">
          <div className="flex justify-center">
            {icon}
          </div>
          <Dialog.Title className="text-xl font-semibold">
            {title}
          </Dialog.Title>
          <Dialog.Description className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </Dialog.Description>
          <div className="flex justify-center mt-4">
            <button
              onClick={handleClose}
              className={`${color} text-white px-4 py-2 rounded-md`}
            >
              {buttonLabel}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
