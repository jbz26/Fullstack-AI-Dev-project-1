// components/candidate/AddCandidateForm.tsx
'use client';
import { useState } from 'react';
import { CandidateType, Candidate } from "@/app/type/candidate";
import { CandidateFormFields } from '@/components/candidate/CandidateForm';

export default function AddCandidateForm({ onSubmit }: { onSubmit: (c: Candidate) => void }) {
  const [form, setForm] = useState({
    type: 'Applicant',
    name: '',
    position: '',
    phone: '',
    source: '',
    interviewDate: '',
    feedback: '',
    notes: '',
    applicationDate: '',
    email: '',
    status: '',
    interviewTime: '',
    interviewer: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setForm(prev => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const candidate: Candidate = {
      type: form.type as CandidateType,
      name: form.name,
      position: form.position,
      phone_number: form.phone,
      source: form.source,
      interview_date: form.interviewDate,
      feedback: form.feedback,
      notes: form.notes,
      application_date: form.applicationDate,
      email: form.email,
      status: form.status,
      interview_time: form.interviewTime,
      interviewer: form.interviewer,
      hr_id: 3,
    };
    onSubmit(candidate);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-8 py-4">
      <CandidateFormFields form={form} onChange={handleChange} onTypeChange={handleTypeChange} />
      <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600">
        Add Candidate
      </button>
    </form>
  );
}
