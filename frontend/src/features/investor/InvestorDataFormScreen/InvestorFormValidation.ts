import * as yup from 'yup';

export const investorDataFormValidationSchema = yup.object().shape({
  name: yup.string().required('Name required to be entered'),
  surname: yup.string().required('Surname required to be entered'),
  middleName: yup.string().required('Parental name required to be entered'),
  idFile: yup.mixed().required(),
  photo: yup.mixed().required(),
});
