// components/MissingFieldsDialog.tsx
'use client';
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';

export default function MissingFieldsDialog({ open, onClose, missingFields }: {
  open: boolean;
  onClose: () => void;
  missingFields: string[];
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onClose}>
      <Dialog.Portal>
      <Dialog.Overlay className="fixed inset-0 bg-black/50 z-[100]" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg z-[101]">
          <Dialog.Title className="text-lg font-bold mb-2">Thiếu thông tin bắt buộc</Dialog.Title>
          <Dialog.Description className="text-sm mb-4 text-gray-600 dark:text-gray-300">
            Vui lòng điền đầy đủ các trường sau:
          </Dialog.Description>

          <ul className="list-disc list-inside text-sm text-red-600 mb-4">
            {missingFields.map((field, idx) => (
              <li key={idx}>{field}</li>
            ))}
          </ul>

          <div className="text-right">
            <Dialog.Close asChild>
              <button
                onClick={onClose}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Đóng
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 dark:hover:text-white">
              <Cross2Icon />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
