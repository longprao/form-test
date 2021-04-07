import { Field } from 'formik';
import React, { FC, InputHTMLAttributes } from 'react';

type Props = {};

const FieldText: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return <Field className="control" {...props} />;
};

export default FieldText;
