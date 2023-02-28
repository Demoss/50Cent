import * as yup from 'yup';

import { FILE_SIZE } from '@/constants/constants';

export const investorDataFormValidationSchema = yup.object().shape({
  name: yup.string().required('Please, enter the Name'),
  surname: yup.string().required('Please, enter the Surname'),
  middleName: yup.string().required('Please, enter Parental name'),
  idFile: yup
    .mixed()
    .required()
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= FILE_SIZE,
    ),
  photo: yup
    .mixed()
    .required()
    .test(
      'fileSize',
      'File too large. Size must be equal or less then 2 mb.',
      (value) => value && value.size <= FILE_SIZE,
    ),
});
