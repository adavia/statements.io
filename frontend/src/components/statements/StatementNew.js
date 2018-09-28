import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Formik, Form, Field } from 'formik';
import isEmpty from 'lodash/isEmpty';
import * as Yup from 'yup';
import { InputField, TextField, SelectField } from '../shared/Fields';

import { Button } from '../shared';

class StatementNew extends PureComponent {
  render() {
    const { onCreateStatement, categories } = this.props;

    return (
      <Formik
        initialValues={{ 
          title: '',
          description: '',
          categories: []
        }}
        validationSchema={
          Yup.object().shape({
            title: Yup.string()
              .min(2, 'Title cannot be so short!')
              .max(50, 'Title cannot be to long!')
              .required('You must add a title!'),
            categories: Yup.array()
              .min(1, 'Pick at least 1 category')
              .of(
                Yup.object().shape({
                  label: Yup.string().required(),
                  value: Yup.string().required(),
                })
              )
          })
        }
        onSubmit={ async (values, actions) => {
          const categories = values.categories.map(category => category.value);
          const response = await onCreateStatement({ ...values, categories });

          if (response.status === 201) {
            actions.resetForm();
          } else {
            actions.setSubmitting(false);
          }
        }}
        render={props => (
          <FormWrapper>
            <Form>
              <Field 
                name="title" 
                label="Title" 
                placeholder="Whats your statement about?" 
                component={InputField} 
              />
              <Field 
                name="description" 
                label="Description" 
                rows="4"
                placeholder="Describe this statement" 
                component={TextField} 
              />
              <Field 
                name="categories" 
                label="Categories" 
                options={categories.map(c => ({ value: c._id, label: c.name }))}
                isMulti={true}
                placeholder="Select at least one category" 
                component={SelectField} 
              />
              <Button 
                primary 
                disabled={props.isSubmitting && isEmpty(props.errors)}
                type="submit">
                Submit
              </Button>
            </Form>
          </FormWrapper>
        )}
      />
    );
  }
}

const FormWrapper = styled('div')`
  box-sizing: border-box;
  width: 30%;
  @media (max-width: 576px) {
    width: 100%;
  }
`

export default StatementNew;