// components/CandidateCard.tsx
'use client';

import { Candidate } from "@/app/type/candidate";
import { Button } from "@/components/ui/button";

type CandidateCardProps = {
  candidate: Candidate;
  onView?: (candidate: Candidate) => void;
  onEdit?: (candidate: Candidate) => void;
  onDelete?: (candidate: Candidate) => void;
};

export default function CandidateCard({
  candidate,
  onView,
  onEdit,
  onDelete,
}: CandidateCardProps) {
  return (
    <div className="bg-white dark:bg-neutral-800 text-black dark:text-white border border-gray-300 dark:border-neutral-700 p-5 rounded-2xl flex justify-between items-start shadow-sm">
      <div className="space-y-1">
        <p className="text-lg font-semibold">{candidate.name}</p>
        {candidate.status && (
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Status: {candidate.status}
          </p>
        )}
      </div>

      <div className="flex flex-col items-end gap-2">
        {candidate.position && (
          <p className="text-sm text-right text-gray-600 dark:text-gray-300">
            Position: {candidate.position}
          </p>
        )}

        <div className="flex gap-2">
          <Button
            variant="outline"
            className="rounded-full px-4 py-1 text-sm"
            onClick={() => onView?.(candidate)}
          >
            View
          </Button>
          {onEdit && (
            <Button
              className="bg-green-500 hover:bg-green-600 text-white rounded-full px-4 py-1 text-sm"
              onClick={() => onEdit(candidate)}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              className="text-red-500 hover:text-red-700 rounded-full px-4 py-1 text-sm"
              onClick={() => onDelete(candidate)}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
