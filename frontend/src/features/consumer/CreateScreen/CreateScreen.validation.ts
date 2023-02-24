import * as yup from 'yup';

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
      (value) => value && value.size <= 2 * 1024 * 1024,
    ),
  work_file: yup
    .mixed()
    .required('required')
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= 2 * 1024 * 1024,
    ),
  id_file: yup
    .mixed()
    .required('required')
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= 2 * 1024 * 1024,
    ),
  property_file: yup
    .mixed()
    .required('required')
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= 2 * 1024 * 1024,
    ),
});
