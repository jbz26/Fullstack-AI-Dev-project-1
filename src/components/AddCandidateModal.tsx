'use client';

import { useState } from 'react';

// Types for child components
type InputProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

type TextAreaProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export default function AddCandidateModal() {
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTypeChange = (type: string) => {
    setForm(prev => ({ ...prev, type }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form data:', form);
    // handle save logic
  };

  return (
    <div className="min-h-screen w-full bg-white text-black px-10 py-8">
      <form onSubmit={handleSubmit}>
        {/* Candidate type */}
        <div className="mb-6">
          <label className="font-semibold block mb-2">Candidate type</label>
          <div className="space-x-4">
            {['Applicant', 'Employee', 'Intern'].map(type => (
              <label key={type} className="inline-flex items-center space-x-1">
                <input
                  type="radio"
                  name="type"
                  checked={form.type === type}
                  onChange={() => handleTypeChange(type)}
                />
                <span>{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-4">
            <Input label="Candidate name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Position" name="position" value={form.position} onChange={handleChange} />
            <Input label="Phone number" name="phone" value={form.phone} onChange={handleChange} />
            <Input label="Source" name="source" value={form.source} onChange={handleChange} />
            <Input label="Interview date" name="interviewDate" type="date" value={form.interviewDate} onChange={handleChange} />
            <TextArea label="Feedback" name="feedback" value={form.feedback} onChange={handleChange} />
            <TextArea label="Notes" name="notes" value={form.notes} onChange={handleChange} />
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <Input label="Application date" name="applicationDate" type="date" value={form.applicationDate} onChange={handleChange} />
            <Input label="Email" name="email" type="email" value={form.email} onChange={handleChange} />
            <Input label="Status" name="status" value={form.status} onChange={handleChange} />
            <Input label="Interview time" name="interviewTime" type="time" value={form.interviewTime} onChange={handleChange} />
            <Input label="Interviewer" name="interviewer" value={form.interviewer} onChange={handleChange} />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex space-x-4 mt-8">
          <button
            type="submit"
            className="bg-green-500 text-white px-6 py-2 rounded-xl hover:bg-green-600"
          >
            Add candidate
          </button>
          <button
            type="button"
            className="bg-gray-200 px-6 py-2 rounded-xl hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

// Input component
const Input = ({ label, name, value, onChange, type = 'text' }: InputProps) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
    />
  </div>
);

// TextArea component
const TextArea = ({ label, name, value, onChange }: TextAreaProps) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      rows={3}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none"
    />
  </div>
);
