import { ReferralInterface } from 'interfaces/referral';
import { JobPostingInterface } from 'interfaces/job-posting';
import { GetQueryInterface } from 'interfaces';

export interface CandidateInterface {
  id?: string;
  name: string;
  profile: string;
  job_posting_id?: string;
  created_at?: any;
  updated_at?: any;
  referral?: ReferralInterface[];
  job_posting?: JobPostingInterface;
  _count?: {
    referral?: number;
  };
}

export interface CandidateGetQueryInterface extends GetQueryInterface {
  id?: string;
  name?: string;
  profile?: string;
  job_posting_id?: string;
}
