import * as yup from 'yup';

export const consumerDataFormValidationSchema = yup.object().shape({
  name: yup.string().required('Enter the name, please.'),
  surname: yup.string().required('Enter the surname, please.'),
  middleName: yup.string().required('Enter the parental name, please.'),
  photo: yup.mixed(),
  workFile: yup.mixed(),
  idFile: yup.mixed(),
  propertyFile: yup.mixed(),
});
