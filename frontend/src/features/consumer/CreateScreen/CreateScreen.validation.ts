import * as yup from 'yup';

import {FILE_SIZE} from "@/constants/constants";

export const CreateFormValidationSchema = yup.object().shape({
  name: yup.string().required('required'),
  surname: yup.string().required('required'),
  middle_name: yup.string().required('required'),
  photo: yup
    .mixed()
    .required('required')
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= FILE_SIZE,
    ),
  work_file: yup
    .mixed()
    .required('required')
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= FILE_SIZE,
    ),
  id_file: yup
    .mixed()
    .required('required')
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= FILE_SIZE,
    ),
  property_file: yup
    .mixed()
    .required('required')
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= FILE_SIZE,
    ),
});
