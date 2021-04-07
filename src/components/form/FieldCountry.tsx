import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import { Field, FieldInputProps, FormikProps } from 'formik';
import React, { FC, useState } from 'react';
import OutsideClickHandler from 'react-outside-click-handler';
import { countries } from '../../utils/countries';

type Props = {
  name: string;
  placeholder?: string;
};

const FieldCountry: FC<Props> = ({ name, placeholder }) => {
  const [active, setActive] = useState(false);

  return (
    <Field name={name}>
      {({ field, form }: { field: FieldInputProps<string>; form: FormikProps<any> }) => {
        const handleChange = (value: string) => () => {
          form.setFieldValue(name, value);
          setActive(false);
        };

        return (
          <OutsideClickHandler onOutsideClick={() => setActive(false)}>
            <div className="dropdown-select">
              <div className="control ellipsis toggle" onClick={() => setActive((prevState) => !prevState)}>
                {field.value ? countries[field.value] : placeholder}
                <div className="i">
                  <FontAwesomeIcon icon="chevron-down" />
                </div>
              </div>

              <div className={clsx('dropdown-popup', { active })}>
                {Object.keys(countries).map((el) => (
                  <button key={el} type="button" className="item" onClick={handleChange(el)}>
                    {countries[el]}
                  </button>
                ))}
              </div>
            </div>
          </OutsideClickHandler>
        );
      }}
    </Field>
  );
};

export default FieldCountry;
