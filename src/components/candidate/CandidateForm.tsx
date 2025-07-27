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
type SelectProps = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
};



type Props = {
  form: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement| HTMLSelectElement>) => void;
  onTypeChange: (type: string) => void;
};
const STATUS_OPTIONS = ['Pending', 'Interviewing', 'Offered', 'Rejected'];

export function CandidateFormFields({ form, onChange, onTypeChange }: Props) {
  return (
    <div>
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
                onChange={() => onTypeChange(type)}
              />
              <span>{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left column */}
        <div className="space-y-4">
          <Input label="Candidate name" name="name" value={form.name} onChange={onChange} />
          <Input label="Position" name="position" value={form.position} onChange={onChange} />
          <Input label="Phone number" name="phone_number" value={form.phone_number} onChange={onChange} />
          <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} />
          <Input label="Date of Birth" name="dob" type="date" value={form.dob} onChange={onChange} />
          <Input label="Application date" name="application_date" type="date" value={form.application_date} onChange={onChange} />
          <Input label="Interview date" name="interview_date" type="date" value={form.interview_date} onChange={onChange} />
          <Input label="Interview time" name="interview_time" type="time" value={form.interview_time} onChange={onChange} />
        </div>

        {/* Right column */}
        <div className="space-y-4">
          <Input label="Source" name="source" value={form.source} onChange={onChange} />
          <Select
            label="Status"
            name="status"
            value={form.status}
            onChange={onChange}
            options={STATUS_OPTIONS}
          />

          <Input label="Interviewer" name="interviewer" value={form.interviewer} onChange={onChange} />
          <Input label="Experience" name="experience" value={form.experience} onChange={onChange} />
          <Input label="Skills" name="skills" value={form.skills} onChange={onChange} />
          <TextArea label="Feedback" name="feedback" value={form.feedback} onChange={onChange} />
          <TextArea label="Notes" name="notes" value={form.notes} onChange={onChange} />
        </div>
      </div>
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
const Select = ({ label, name, value, onChange, options }: SelectProps) => (
  <div>
    <label className="text-sm font-medium block mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none bg-white dark:bg-black"
    >
      <option value="" disabled>-- Select --</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);