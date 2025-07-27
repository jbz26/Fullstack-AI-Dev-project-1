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
import axios from '@/utils/axiosInstance';
import { AxiosError } from 'axios';

import GenericDialog from '@/components/dialog/GenericDialog';

export default function CandidateDashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [editingCandidate, setEditingCandidate] = useState<Candidate | null>(null);
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL!;
  const access_token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  const [showDialog, setShowDialog] = useState(false);
  const [dialogConfirmAction, setDialogConfirmAction] = useState<() => void>(() => () => {});

  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogDescription, setDialogDescription] = useState('');
  const [dialogVariant, setDialogVariant] = useState<'information' | 'warning' | 'error'>('information');


  // ===================== DB Actions =====================

  const loadCandidates = async () => {
    try {
      const res = await axios.get(`${API_URL}/candidates/get_all`)

      const data = await res.data;
      setCandidates(data);
    } catch (err) {
    }
  };

  const addCandidateToDB = async (candidate: Candidate): Promise<Candidate | null> => {
  try {
    const res = await axios.post(`${API_URL}/candidates/add`, candidate);
    return res.data;
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    const message = error.response?.data?.detail || error.message || "An unknown error occurred";
    throw new Error(message); // 👉 Cho catch ở ngoài xử lý
  }
};


  const updateCandidateInDB = async (candidate: Candidate): Promise<Candidate | null> => {
  try {
    const res = await axios.put(`${API_URL}/candidates/${candidate.id}`, candidate);
    return res.data;
  } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;

      const message = error.response?.data?.detail || error.message || "An unknown error occurred";
      throw new Error(message); // 👉 Ném lỗi để xử lý bên ngoài

  }
};


  const deleteCandidateFromDB = async (id: number): Promise<void> => {
    try {
      await axios.delete(`${API_URL}/candidates/delete/${id}`);
    } catch (err) {
      const error = err as AxiosError<{ detail?: string }>;

      const message = error.response?.data?.detail || error.message || "An unknown error occurred";
      throw new Error(message);
    }
  };


  // ===================== UI Handlers =====================

  const handleAddOrUpdateCandidate = async (candidate: Candidate) => {
    if (!access_token) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('user');
      router.replace('/auth/login');

      return;
    }

    let result: Candidate | null = null;

    try {
      if (editingCandidate) {
        result = await updateCandidateInDB(candidate);
        setCandidates(prev =>
          prev.map(c => (c.id === result!.id ? result! : c))
        );
        setDialogTitle("Success");
        setDialogDescription("Candidate updated successfully!");
      } else {
        result = await addCandidateToDB(candidate);
        setCandidates(prev => [...prev, result!]);
        setDialogTitle("Success");
        setDialogDescription("Candidate added successfully!");
      }
      setShowDialog(true);
      setDialogConfirmAction(() => {});
      setDialogVariant("information");
    } catch (_) {

    } finally {
      
      setModalOpen(false);
      setEditingCandidate(null);
    }

  };

  const handleDeleteCandidate = async (id: number) => {
  try {
    await deleteCandidateFromDB(id);
    setCandidates(prev => prev.filter(c => c.id !== id));
    setDialogVariant("information");
    setDialogTitle("Success");
    setDialogDescription("Candidate deleted successfully!");
  } catch (err) {
    const error = err as AxiosError<{ detail?: string }>;

    setDialogVariant("error");
    setDialogTitle("Error");
    setDialogDescription(error.message || "Failed to delete candidate.");
  } finally {
    setDialogConfirmAction(() => {});
    setShowDialog(true);
  }
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
      const access_token = localStorage.getItem('access_token');
      if (!user) {
        router.replace('/auth/login');
      } else {
        loadCandidates();
      }
    };

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'user' && event.newValue === null) {
        localStorage.removeItem('access_token');
        localStorage.removeItem('user');
        router.replace('/auth/login');
      }
    };

    init();
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [router]);


  // ===================== UI =====================

  return (
    <>
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
     <GenericDialog
            variant={dialogVariant}
            title={dialogTitle}
            description={dialogDescription}
            open={showDialog}
            onClose={() => setShowDialog(false)}
            onConfirm={dialogConfirmAction} // 👈 thực thi hành động khi OK
            
          />
    </>
  );
}
