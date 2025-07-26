// components/candidate/CandidateFormFields.tsx
'use client';
import React from 'react';

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

type Props = {
  form: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onTypeChange: (type: string) => void;
};

export function CandidateFormFields({ form, onChange, onTypeChange }: Props) {
  return (
    <div>
      <div className="mb-6">
        <label className="font-semibold block mb-2">Candidate type</label>
        <div className="space-x-4">
          {['Applicant', 'Employee', 'Intern'].map(type => (
            <label key={type} className="inline-flex items-center space-x-1">
              <input
                type="radio"
                name="type"
                checked={form.type === type}
                onChange={() => onTypeChange(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Input label="Candidate name" name="name" value={form.name} onChange={onChange} />
          <Input label="Position" name="position" value={form.position} onChange={onChange} />
          <Input label="Phone number" name="phone" value={form.phone} onChange={onChange} />
          <Input label="Source" name="source" value={form.source} onChange={onChange} />
          <Input label="Interview date" name="interviewDate" type="date" value={form.interviewDate} onChange={onChange} />
          <TextArea label="Feedback" name="feedback" value={form.feedback} onChange={onChange} />
          <TextArea label="Notes" name="notes" value={form.notes} onChange={onChange} />
        </div>

        <div className="space-y-4">
          <Input label="Application date" name="applicationDate" type="date" value={form.applicationDate} onChange={onChange} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
          <Input label="Status" name="status" value={form.status} onChange={onChange} />
          <Input label="Interview time" name="interviewTime" type="time" value={form.interviewTime} onChange={onChange} />
          <Input label="Interviewer" name="interviewer" value={form.interviewer} onChange={onChange} />
        </div>
      </div>
    </div>
  );
}

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
