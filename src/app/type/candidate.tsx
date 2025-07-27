// types/candidate.ts

export type CandidateType = 'Applicant' | 'Employee' | 'Intern';

export type Candidate = {
  id?: number;
  type: CandidateType;
  name: string;
  dob?: string;
  email?: string;
  phone_number?: string;
  position?: string;
  experience?: string;
  skills?: string;
  status?: string;
  source?: string;
  application_date?: string;
  interview_date?: string;
  interview_time?: string;
  interviewer?: string;
  feedback?: string;
  notes?: string;
  hr_id?: number;
};
