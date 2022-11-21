import * as yup from 'yup';

export const consumerDataFormValidationSchema = yup.object().shape({
  name: yup.string().required("Будь ласка, введіть ім'я"),
  surname: yup.string().required('Будь ласка, введіть прізвище'),
  middleName: yup.string().required('Будь ласка, введіть по батькові'),
  photo: yup.mixed(),
  workFile: yup.mixed(),
  idFile: yup.mixed(),
  propertyFile: yup.mixed(),
});
