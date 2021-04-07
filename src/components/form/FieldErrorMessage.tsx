import { ErrorMessage, ErrorMessageProps } from 'formik';
import React, { FC } from 'react';

const FieldErrorMessage: FC<ErrorMessageProps> = (props) => {
  return <ErrorMessage {...props}>{(msg) => <p className="red">{msg}</p>}</ErrorMessage>;
};

export default FieldErrorMessage;
