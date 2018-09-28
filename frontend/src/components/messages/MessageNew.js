import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { InputField } from '../shared/Fields';

class MessageNew extends PureComponent {
  render() {
    const { onCreateMessage } = this.props;

    return (
      <Formik
        initialValues={{ 
          content: '' 
        }}
        validationSchema={
          Yup.object().shape({
            content: Yup.string()
              .required('Cannot be empty!')
          })
        }
        onSubmit={ async (values, actions) => {
          onCreateMessage(values);
          actions.setSubmitting(false);
          actions.resetForm();
        }}
        render={props => (
          <FormWrapper>
            <Form>
              <Field 
                name="content" 
                placeholder="Leave a message!" 
                component={InputField} 
              />
            </Form>
          </FormWrapper>
        )}
      />
    );
  }
}

const FormWrapper = styled('div')`
  padding: 1rem 1rem 0 1rem;
  border-top: 3px solid #DDD;
  background: #FFF;
`

export default MessageNew;