import fetch from 'cross-fetch';
import { Form, Formik } from 'formik';
import { forEach, pick } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import slug from 'slug';
import * as yup from 'yup';
import ButtonSubmit from './components/form/ButtonSubmit';
import FieldCheckboxes, { CheckboxField } from './components/form/FieldCheckboxes';
import FieldCountry from './components/form/FieldCountry';
import FieldDatePicker from './components/form/FieldDatepicker';
import FieldErrorMessage from './components/form/FieldErrorMessage';
import FieldFile from './components/form/FieldFile';
import FieldText from './components/form/FieldText';
import { validateCheckboxes, validateRequired } from './utils/validations';

const Components: { [key: string]: FC<any> } = {
  TEXT_FIELD: FieldText,
  FILE_INPUT: FieldFile,
  COUNTRY_SELECT: FieldCountry,
  DATE_INPUT_DROPDOWN: FieldDatePicker,
};

const defaultValue: { [key: string]: any } = {
  TEXT_FIELD: '',
  FILE_INPUT: '',
  COUNTRY_SELECT: '',
  DATE_INPUT_DROPDOWN: new Date(),
};

type FormField = {
  _id: string;
  name: string;
  readonly?: boolean;
  required?: boolean;
  label: string;
  placeholder?: string;
  structuredField?: string;
  height?: string;
  type: string;
  checkboxList?: CheckboxField[];
};

function App() {
  const [submit, setSubmit] = useState<any>();
  const [data, setData] = useState<FormField[]>();

  useEffect(() => {
    const query = async () => {
      const res = await fetch(process.env.PUBLIC_URL + '/api/task1.json');
      const data = await res.json();
      setData(data);
    };

    query();
  }, []);

  if (!data) return <div>Loading...</div>;

  const model = data.reduce(
    (a, b) => ({
      ...a,
      [slug(b.name)]:
        b.type === 'CHECKBOX' ? b.checkboxList?.filter((el) => el.checked).map((el) => el.value) : defaultValue[b.type],
    }),
    {},
  );

  const validationSchema = data.reduce(
    (a, b) => ({
      ...a,
      [slug(b.name)]: b.required ? (b.type === 'CHECKBOX' ? validateCheckboxes : validateRequired) : undefined,
    }),
    {},
  );

  return (
    <div className="App">
      <section className="container">
        <Formik
          initialValues={model}
          validationSchema={yup.object().shape(validationSchema)}
          onSubmit={async (values) => {
            setSubmit(values);

            const formData = new FormData();

            forEach(values, (value: any, key) => {
              formData.append(key, value);
            });

            const res = await fetch('/', {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
              body: formData,
              method: 'POST',
            });

            console.log(await res.json());
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="form">
              {data?.map((el) => {
                if (el.type === 'SPACING')
                  return <div key={el._id} style={{ height: Number(el.height) }} className="height" />;

                if (el.type === 'CHECKBOX' && el.checkboxList)
                  return <FieldCheckboxes key={el._id} name={slug(el.name)} label={el.label} items={el.checkboxList} />;

                return (
                  <div className="group" key={el._id}>
                    <label className="label">{el.label}</label>

                    {Components[el.type]
                      ? React.createElement(Components[el.type], {
                          ...pick(el, ['multiple', 'label', 'placeholder']),
                          name: slug(el.name),
                          readOnly: el.readonly,
                        })
                      : null}

                    <FieldErrorMessage name={slug(el.name)} />
                  </div>
                );
              })}

              <ButtonSubmit
                title="Save"
                className="btn btn-primary btn-full"
                loading={isSubmitting}
                disabled={!(isValid && dirty)}
              />
            </Form>
          )}
        </Formik>

        <br />
        <br />
        {submit && <pre>{JSON.stringify(submit, null, 2)}</pre>}
      </section>
    </div>
  );
}

export default App;
