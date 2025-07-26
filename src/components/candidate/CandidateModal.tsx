'use client';

import { Candidate } from "@/app/type/candidate";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

type CandidateModalProps = {
  candidate: Candidate | null;
  open: boolean;
  onClose: () => void;
};

export default function CandidateModal({ candidate, open, onClose }: CandidateModalProps) {
  if (!candidate) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{candidate.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          {candidate.type && <p><strong>Type:</strong> {candidate.type}</p>}
          {candidate.email && <p><strong>Email:</strong> {candidate.email}</p>}
          {candidate.phone_number && <p><strong>Phone:</strong> {candidate.phone_number}</p>}
          {candidate.dob && <p><strong>DOB:</strong> {candidate.dob}</p>}
          {candidate.position && <p><strong>Position:</strong> {candidate.position}</p>}
          {candidate.experience && <p><strong>Experience:</strong> {candidate.experience} years</p>}
          {candidate.skills && <p><strong>Skills:</strong> {candidate.skills}</p>}
          {candidate.status && <p><strong>Status:</strong> {candidate.status}</p>}
          {candidate.source && <p><strong>Source:</strong> {candidate.source}</p>}
          {candidate.application_date && <p><strong>Application Date:</strong> {candidate.application_date}</p>}
          {candidate.interview_date && <p><strong>Interview Date:</strong> {candidate.interview_date}</p>}
          {candidate.interview_time && <p><strong>Interview Time:</strong> {candidate.interview_time}</p>}
          {candidate.interviewer && <p><strong>Interviewer:</strong> {candidate.interviewer}</p>}
          {candidate.feedback && <p><strong>Feedback:</strong> {candidate.feedback}</p>}
          {candidate.notes && <p><strong>Notes:</strong> {candidate.notes}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
