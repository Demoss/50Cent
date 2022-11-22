import * as yup from 'yup';

export const investorDataFormValidationSchema = yup.object().shape({
  name: yup.string().required('Please, enter the Name'),
  surname: yup.string().required('Please, enter the Surname'),
  middleName: yup.string().required('Please, enter Parental name'),
  idFile: yup.mixed().required(),
  photo: yup.mixed().required(),
});
