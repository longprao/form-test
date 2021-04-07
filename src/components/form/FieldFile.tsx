import { Field, FormikProps } from 'formik';
import React, { FC, InputHTMLAttributes } from 'react';

type Props = {};

const FieldFile: FC<Props & InputHTMLAttributes<HTMLInputElement>> = ({ ...props }) => {
  return (
    <Field name={props.name}>
      {({ form }: { form: FormikProps<any> }) => {
        return (
          <input
            className="control"
            type="file"
            onChange={(event) => form.setFieldValue(String(props.name), event.currentTarget.files)}
            {...props}
          />
        );
      }}
    </Field>
  );
};

export default FieldFile;
