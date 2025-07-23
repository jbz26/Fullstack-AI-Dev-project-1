'use client';

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

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white px-6 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">RecruitMaster</h1>
          <Button
            onClick={() => setModalOpen(true)}
            className="bg-white text-black hover:bg-gray-200"
          >
            Add Candidate
          </Button>
        </div>

        {/* ...Bạn có thể chèn danh sách ứng viên ở đây... */}

        {/* Modal Popup */}
        <Dialog open={modalOpen} onOpenChange={setModalOpen}>
          <DialogContent className="max-w-5xl bg-white text-black max-h-[90vh] overflow-y-auto rounded-xl">
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
