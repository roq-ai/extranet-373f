import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createCandidate } from 'apiSdk/candidates';
import { Error } from 'components/error';
import { candidateValidationSchema } from 'validationSchema/candidates';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { JobPostingInterface } from 'interfaces/job-posting';
import { getJobPostings } from 'apiSdk/job-postings';
import { CandidateInterface } from 'interfaces/candidate';

function CandidateCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CandidateInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCandidate(values);
      resetForm();
      router.push('/candidates');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CandidateInterface>({
    initialValues: {
      name: '',
      profile: '',
      job_posting_id: (router.query.job_posting_id as string) ?? null,
    },
    validationSchema: candidateValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Candidate
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="name" mb="4" isInvalid={!!formik.errors?.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" name="name" value={formik.values?.name} onChange={formik.handleChange} />
            {formik.errors.name && <FormErrorMessage>{formik.errors?.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="profile" mb="4" isInvalid={!!formik.errors?.profile}>
            <FormLabel>Profile</FormLabel>
            <Input type="text" name="profile" value={formik.values?.profile} onChange={formik.handleChange} />
            {formik.errors.profile && <FormErrorMessage>{formik.errors?.profile}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<JobPostingInterface>
            formik={formik}
            name={'job_posting_id'}
            label={'Select Job Posting'}
            placeholder={'Select Job Posting'}
            fetcher={getJobPostings}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.title}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'candidate',
    operation: AccessOperationEnum.CREATE,
  }),
)(CandidateCreatePage);
