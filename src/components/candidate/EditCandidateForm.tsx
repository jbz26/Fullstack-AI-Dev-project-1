// components/candidate/EditCandidateForm.tsx
'use client';
import { useState, useEffect } from 'react';
import { Candidate, CandidateType } from '@/app/type/candidate';
import { CandidateFormFields } from '@/components/candidate/CandidateForm';

export default function EditCandidateForm({ candidate, onSubmit }: {
  candidate: Candidate;
  onSubmit: (c: Candidate) => void;
}) {
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

  useEffect(() => {
    if (candidate) {
      setForm({
        type: candidate.type || 'Applicant',
        name: candidate.name || '',
        position: candidate.position || '',
        phone: candidate.phone_number || '',
        source: candidate.source || '',
        interviewDate: candidate.interview_date || '',
        feedback: candidate.feedback || '',
        notes: candidate.notes || '',
        applicationDate: candidate.application_date || '',
        email: candidate.email || '',
        status: candidate.status || '',
        interviewTime: candidate.interview_time || '',
        interviewer: candidate.interviewer || '',
      });
    }
  }, [candidate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setForm(prev => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedCandidate: Candidate = {
      ...candidate,
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
    };
    onSubmit(updatedCandidate);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 px-8 py-4">
      <CandidateFormFields form={form} onChange={handleChange} onTypeChange={handleTypeChange} />
      <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600">
        Save Changes
      </button>
    </form>
  );
}
