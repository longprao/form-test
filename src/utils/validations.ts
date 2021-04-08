import * as yup from 'yup';

export const validateRequired = yup.string().required('This field is required');

export const validateCheckboxes = yup.array().min(1, 'At least one must be selected');
