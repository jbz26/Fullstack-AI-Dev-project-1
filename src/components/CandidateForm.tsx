'use client';
import { useState } from 'react';

type Candidate = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  position: string;
  experience: string;
  skills: string;
};

type CandidateFormProps = {
  onAdd: (candidate: Candidate) => void;
};

type FormField = keyof Candidate;
type FormData = {
  [key in FormField]: string;
};

export default function CandidateForm({ onAdd }: CandidateFormProps) {
  // ✅ useState phải nằm trong component
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    dob: '',
    position: '',
    experience: '',
    skills: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAdd(form);
    setForm({
      name: '',
      email: '',
      phone: '',
      dob: '',
      position: '',
      experience: '',
      skills: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-2 gap-2">
        {(['name', 'email', 'phone', 'dob'] as FormField[]).map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field.toUpperCase()}
            className="border p-2 rounded"
          />
        ))}
        <input
          name="position"
          value={form.position}
          onChange={handleChange}
          placeholder="Position"
          className="border p-2 rounded"
        />
        <input
          name="experience"
          value={form.experience}
          onChange={handleChange}
          placeholder="Years of Experience"
          className="border p-2 rounded"
        />
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills"
          className="col-span-2 border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Candidate
      </button>
    </form>
  );
}
