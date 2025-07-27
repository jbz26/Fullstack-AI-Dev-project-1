'use client';

import { useState, useEffect } from 'react';
import { Candidate, CandidateType } from '@/app/type/candidate';
import { CandidateFormFields } from '@/components/candidate/CandidateForm';
import MissingFieldsDialog from '@/components/dialog/MissingFieldsDialog';

export default function EditCandidateForm({
  candidate,
  onSubmit,
}: {
  candidate: Candidate;
  onSubmit: (c: Candidate) => void;
}) {
  const [form, setForm] = useState({
    type: 'Applicant' as CandidateType,
    name: '',
    dob: '',
    email: '',
    phone_number: '',
    position: '',
    experience: '',
    skills: '',
    status: '',
    source: '',
    application_date: '',
    interview_date: '',
    interview_time: '',
    interviewer: '',
    feedback: '',
    notes: '',
  });
  const [showDialog, setShowDialog] = useState(false);
  const [missingFields, setMissingFields] = useState<string[]>([]);
  useEffect(() => {
    if (candidate) {
      setForm({
        type: candidate.type || 'Applicant',
        name: candidate.name || '',
        dob: candidate.dob || '',
        email: candidate.email || '',
        phone_number: candidate.phone_number || '',
        position: candidate.position || '',
        experience: candidate.experience || '',
        skills: candidate.skills || '',
        status: candidate.status || '',
        source: candidate.source || '',
        application_date: candidate.application_date || '',
        interview_date: candidate.interview_date || '',
        interview_time: candidate.interview_time || '',
        interviewer: candidate.interviewer || '',
        feedback: candidate.feedback || '',
        notes: candidate.notes || '',
      });
    }
  }, [candidate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setForm(prev => ({ ...prev, type: type as CandidateType }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone_number', 'position', 'status'];
    const missingFields = requiredFields.filter(field => !form[field as keyof typeof form]);
    console.log('Missing fields:', missingFields);
    if (missingFields.length > 0) {
      setMissingFields(missingFields);
      setShowDialog(true);
      return;
    }
    const updatedCandidate: Candidate = {
      ...candidate,
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

    onSubmit(updatedCandidate);
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="space-y-6 px-8 py-4">
      <CandidateFormFields
        form={form}
        onChange={handleChange}
        onTypeChange={handleTypeChange}
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600"
      >
        Save Changes
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
