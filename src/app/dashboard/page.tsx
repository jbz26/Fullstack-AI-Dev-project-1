'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react'
import { useState } from 'react';
import AddCandidateModal from '@/components/AddCandidateModal';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function CandidateDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
  const handleStorageChange = (event: StorageEvent) => {
    if (event.key === 'user' && event.newValue === null) {
      router.replace('/login');
    }
  };

  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, []);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white px-6 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">RecruitMaster</h1>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-300"
          >
            Add Candidate
          </Button>
        </div>

        {/* Danh sách ứng viên */}

        {/* Modal Popup */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-5xl bg-white dark:bg-[#1c1c1c] text-black dark:text-white max-h-[90vh] overflow-y-auto rounded-xl transition-colors duration-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">
                Add new candidate
              </DialogTitle>
            </DialogHeader>
            <AddCandidateModal />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
