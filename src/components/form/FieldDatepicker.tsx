import DatePicker from 'react-datepicker';
import { Field, FormikProps } from 'formik';
import React, { FunctionComponent } from 'react';

type Props = {
  name: string;
};

const FieldDatePicker: FunctionComponent<Props> = ({ name }) => {
  return (
    <Field name={name}>
      {({ field, form }: { field: any; form: FormikProps<any> }) => {
        const handleChange = (e: Date) => {
          form.setFieldValue(name, new Date(Date.UTC(e.getFullYear(), e.getMonth(), e.getDate())).toISOString());
        };

        return (
          <div>
            <DatePicker
              selected={new Date(field.value)}
              onChange={handleChange}
              className="control"
              dateFormat="yyyy/MM/dd"
            />
          </div>
        );
      }}
    </Field>
  );
};

export default FieldDatePicker;
