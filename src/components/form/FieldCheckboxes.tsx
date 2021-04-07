import { Field } from 'formik';
import React, { FC } from 'react';
import slug from 'slug';
import FieldErrorMessage from './FieldErrorMessage';

export type CheckboxField = {
  value: string;
  subtitle: string;
  disabled: boolean;
  checked: boolean;
  required: boolean;
};

type Props = {
  name: string;
  label: string;
  items: CheckboxField[];
};

const FieldCheckboxes: FC<Props> = ({ name, label, items }) => {
  return (
    <div className="group">
      <label className="label">{label}</label>

      <div className="row">
        {items.map((el, index) => (
          <div key={index} className="group">
            <div className="checkbox">
              <Field
                type="checkbox"
                id={slug(`${name}-${el.value}`)}
                name={slug(name)}
                value={el.value}
                disabled={el.disabled}
                required={el.required}
              />
              <label htmlFor={slug(`${name}-${el.value}`)}>
                {el.subtitle} {el.value}
              </label>
            </div>
          </div>
        ))}
      </div>

      <FieldErrorMessage name={name} />
    </div>
  );
};

export default FieldCheckboxes;
