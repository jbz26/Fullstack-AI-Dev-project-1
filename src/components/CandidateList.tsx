'use client';
type Candidate = {
  name: string;
  email: string;
  phone: string;
  dob: string;
  position: string;
  experience: string;
  skills: string;
};
type CandidateListProps = {
  candidates: Candidate[];
  onDelete: (index: number) => void;
};

export default function CandidateList({ candidates, onDelete }: CandidateListProps) {
  return (
    <div className="space-y-4 mt-4">
      {candidates.map((c, i) => (
        <div key={i} className="bg-white p-4 rounded shadow flex justify-between">
          <div>
            <p><strong>Name:</strong> {c.name}</p>
            <p><strong>Email:</strong> {c.email}</p>
            <p><strong>Phone:</strong> {c.phone}</p>
            <p><strong>DOB:</strong> {c.dob}</p>
            <p><strong>Position:</strong> {c.position}</p>
            <p><strong>Experience:</strong> {c.experience} years</p>
            <p><strong>Skills:</strong> {c.skills}</p>
          </div>
          <button onClick={() => onDelete(i)} className="text-red-500 hover:text-red-700">Delete</button>
        </div>
      ))}
    </div>
  );
}
