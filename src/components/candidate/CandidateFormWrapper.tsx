import AddCandidateForm from './AddCandidateForm';
import EditCandidateForm from './EditCandidateForm';
import { Candidate } from '@/app/type/candidate';

export default function CandidateFormWrapper({
  candidate,
  onSubmit
}: {
  candidate?: Candidate;
  onSubmit: (c: Candidate) => void;
}) {
  return candidate ? (
    <EditCandidateForm candidate={candidate} onSubmit={onSubmit} />
  ) : (
    <AddCandidateForm onSubmit={onSubmit} />
  );
}
