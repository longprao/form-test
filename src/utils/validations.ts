import * as yup from 'yup';

export const validateRequired = yup.string().required('This field is required');
