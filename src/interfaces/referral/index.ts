import { CandidateInterface } from 'interfaces/candidate';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ReferralInterface {
  id?: string;
  candidate_id?: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  candidate?: CandidateInterface;
  user?: UserInterface;
  _count?: {};
}

export interface ReferralGetQueryInterface extends GetQueryInterface {
  id?: string;
  candidate_id?: string;
  user_id?: string;
}
