// components/dialog/ConfirmDialog.tsx
'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { Button } from "@/components/ui/button";

export default function ConfirmDialog({
  open,
  onConfirm,
  onCancel,
  message = "Are you sure?",
}: {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  message?: string;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={(v) => !v && onCancel()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/30 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-neutral-800 p-6 rounded-xl shadow-xl w-96">
          <Dialog.Title className="text-lg font-semibold text-black dark:text-white mb-4">
            Confirmation
          </Dialog.Title>
          <p className="text-gray-700 dark:text-gray-300 mb-6">{message}</p>
          <div className="flex justify-end gap-3">
            <Button variant="ghost" onClick={onCancel}>
              Cancel
            </Button>
            <Button className="bg-red-600 text-white" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
