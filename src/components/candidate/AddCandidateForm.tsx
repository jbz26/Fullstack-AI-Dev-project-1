'use client';

import { useState } from 'react';
import { CandidateType, Candidate } from "@/app/type/candidate";
import { CandidateFormFields } from '@/components/candidate/CandidateForm';
const getToday = () => new Date().toISOString().split('T')[0];         // YYYY-MM-DD
const getNowTime = () => new Date().toISOString().slice(11, 16);       // HH:MM
import MissingFieldsDialog from '@/components/dialog/MissingFieldsDialog';
export default function AddCandidateForm({ onSubmit }: { onSubmit: (c: Candidate) => void }) {
  const [form, setForm] = useState({
    type: 'Applicant',
    name: '',
    dob: getToday(),
    email: '',
    phone_number: '',
    position: '',
    experience: '',
    skills: '',
    status: '',
    source: '',
    application_date: getToday(),
    interview_date: getToday(),
    interview_time: getNowTime(),
    interviewer: '',
    feedback: '',
    notes: '',
  });

  const [showDialog, setShowDialog] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setForm(prev => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone_number', 'position', 'status'];
    const missingFields = requiredFields.filter(field => !form[field as keyof typeof form]);
    if (missingFields.length > 0) {

      setMissingFields(missingFields);
      setShowDialog(true);

      return;
    }
    const candidate: Candidate = {
      type: form.type as CandidateType,
      name: form.name,
      dob: form.dob,
      email: form.email,
      phone_number: form.phone_number,
      position: form.position,
      experience: form.experience,
      skills: form.skills,
      status: form.status,
      source: form.source,
      application_date: form.application_date,
      interview_date: form.interview_date,
      interview_time: form.interview_time,
      interviewer: form.interviewer,
      feedback: form.feedback,
      notes: form.notes,
    };
    onSubmit(candidate);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6 px-8 py-4">
      <CandidateFormFields form={form} onChange={handleChange} onTypeChange={handleTypeChange} />
      <button type="submit" className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600">
        Add Candidate
      </button>
      
    </form>
    <MissingFieldsDialog
      open={showDialog}
      onClose={() => setShowDialog(false)}
      missingFields={missingFields}
      />
      </>
  );
}
