import axios from 'axios';
import queryString from 'query-string';
import { ReferralInterface, ReferralGetQueryInterface } from 'interfaces/referral';
import { GetQueryInterface } from '../../interfaces';

export const getReferrals = async (query?: ReferralGetQueryInterface) => {
  const response = await axios.get(`/api/referrals${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createReferral = async (referral: ReferralInterface) => {
  const response = await axios.post('/api/referrals', referral);
  return response.data;
};

export const updateReferralById = async (id: string, referral: ReferralInterface) => {
  const response = await axios.put(`/api/referrals/${id}`, referral);
  return response.data;
};

export const getReferralById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/referrals/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteReferralById = async (id: string) => {
  const response = await axios.delete(`/api/referrals/${id}`);
  return response.data;
};
