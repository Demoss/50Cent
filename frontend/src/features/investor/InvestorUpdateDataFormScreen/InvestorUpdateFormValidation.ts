import * as yup from 'yup';

export const investorDataFormValidationSchema = yup.object().shape({
  name: yup.string().required('Enter the name, please.'),
  surname: yup.string().required('Enter the surname, please.'),
  middleName: yup.string().required('Enter the parental name, please.'),
  idFile: yup.mixed(),
  photo: yup.mixed(),
});
