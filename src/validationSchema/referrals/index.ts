import * as yup from 'yup';

export const referralValidationSchema = yup.object().shape({
  candidate_id: yup.string().nullable(),
  user_id: yup.string().nullable(),
});
