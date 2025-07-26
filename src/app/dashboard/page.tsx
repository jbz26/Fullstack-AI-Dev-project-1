'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import CandidateFormWrapper from '@/components/candidate/CandidateFormWrapper';
import { Candidate } from "@/app/type/candidate";
import CandidateList from '@/components/candidate/CandidateList';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export default function CandidateDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const router = useRouter();

  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;

  // ===================== DB Actions =====================

  const loadCandidates = async () => {
    if (!access_token) {
      router.replace('/auth/login');
      return;
    }

    try {
      const res = await fetch(`${API_URL}/candidates/get_all`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (!res.ok) throw new Error('Failed to fetch candidates');

      const data = await res.json();
      setCandidates(data);
    } catch (err) {
      console.error('Error loading candidates:', err);
    }
  };

  const addCandidateToDB = async (candidate: Candidate): Promise<Candidate | null> => {
    try {
      const res = await fetch(`${API_URL}/candidates/add`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      });

      if (!res.ok) throw new Error('Failed to add candidate');
      return await res.json();
    } catch (err) {
      console.error('Error adding candidate:', err);
      return null;
    }
  };

  const updateCandidateInDB = async (candidate: Candidate): Promise<Candidate | null> => {
    try {
      const res = await fetch(`${API_URL}/candidates/update/${candidate.id}`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(candidate),
      });

      if (!res.ok) throw new Error('Failed to update candidate');
      return await res.json();
    } catch (err) {
      console.error('Error updating candidate:', err);
      return null;
    }
  };

  const deleteCandidateFromDB = async (id: number) => {
    try {
      const res = await fetch(`${API_URL}/candidates/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${access_token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) throw new Error('Failed to delete candidate');
    } catch (err) {
      console.error('Error deleting candidate:', err);
    }
  };

  // ===================== UI Handlers =====================

  const handleAddOrUpdateCandidate = async (candidate: Candidate) => {
    if (!access_token) {
      router.replace('/auth/login');
      return;
    }

    let result: Candidate | null = null;

    if (editingCandidate) {
      result = await updateCandidateInDB(candidate);
      if (result) {
        setCandidates(prev =>
          prev.map(c => (c.id === result!.id ? result! : c))
        );
      }
    } else {
      result = await addCandidateToDB(candidate);
      if (result !== null) {
        setCandidates(prev => [...prev, result as Candidate]);
      }
    }

    setModalOpen(false);
    setEditingCandidate(null);
  };

  const handleDeleteCandidate = (index: number) => {
    const candidate = candidates[index];
    if (!candidate) return;

    deleteCandidateFromDB(candidate.id !);
    setCandidates(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditCandidate = (candidate: Candidate) => {
    setEditingCandidate(candidate);
    setModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingCandidate(null);
    setModalOpen(true);
  };

  // ===================== Auth Check =====================

  useEffect(() => {
    const init = async () => {
      const user = localStorage.getItem('user');
      if (!user) {
        router.replace('/auth/login');
      } else {
        loadCandidates();
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user' && event.newValue === null) {
        router.replace('/auth/login');
      }
    };

    init();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router]);

  // ===================== UI =====================

  return (
    <div className="min-h-screen bg-white dark:bg-[#0f0f0f] text-black dark:text-white px-6 py-8 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">RecruitMaster</h1>
          <Button
            onClick={handleOpenAddModal}
            className="bg-white text-black hover:bg-gray-200 dark:bg-white dark:text-black dark:hover:bg-gray-300"
          >
            Add Candidate
          </Button>
        </div>

        {/* Candidate List */}
        <CandidateList
          candidates={candidates}
          onDelete={handleDeleteCandidate}
          onEdit={handleEditCandidate}
        />

        {/* Modal */}
        <Dialog open={modalOpen} onOpenChange={(open) => {
          setModalOpen(open);
          if (!open) setEditingCandidate(null);
        }}>
          <DialogContent className="max-w-5xl bg-white dark:bg-[#1c1c1c] text-black dark:text-white max-h-[90vh] overflow-y-auto rounded-xl transition-colors duration-300">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold mb-2">
                {editingCandidate ? 'Edit Candidate' : 'Add New Candidate'}
              </DialogTitle>
            </DialogHeader>

            <CandidateFormWrapper
              candidate={editingCandidate ?? undefined}
              onSubmit={handleAddOrUpdateCandidate}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
