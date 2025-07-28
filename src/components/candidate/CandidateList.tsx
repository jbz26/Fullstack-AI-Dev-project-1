'use client';

import { useState } from "react";
import { Candidate } from "@/app/type/candidate";
import CandidateCard from "@/components/candidate/CandidateCard";
import CandidateModal from "@/components/candidate/CandidateModal";

type CandidateListProps = {
  candidates: Candidate[];
  onEdit?: (candidate: Candidate) => void;
  onDelete?: (id: number) => void;
};

export default function CandidateList({ candidates, onEdit, onDelete }: CandidateListProps) {
  const [selected, setSelected] = useState<Candidate | null>(null);

  return (
    <div className="space-y-4 mt-6 px-4">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          onView={setSelected}
          onEdit={onEdit}
          onDelete={() => onDelete?.(candidate.id!)}
        />
      ))}

      <CandidateModal
        open={!!selected}
        candidate={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
