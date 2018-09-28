import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import { Formik, Form, Field } from 'formik';
import isEmpty from 'lodash/isEmpty';
import * as Yup from 'yup';
import { TextField } from '../shared/Fields';

import { Button } from '../shared';

class ReviewNew extends PureComponent {
  render() {
    const { onCreateReview } = this.props;

    return (
      <Formik
        initialValues={{ 
          content: '' 
        }}
        validationSchema={
          Yup.object().shape({
            content: Yup.string()
              .min(2, 'Title cannot be so short!')
              .required('You must add a content!')
          })
        }
        onSubmit={ async (values, actions) => {
          const response = await onCreateReview(values);
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
                name="content" 
                rows="4"
                placeholder="Leave a great review!" 
                component={TextField} 
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

export default ReviewNew;