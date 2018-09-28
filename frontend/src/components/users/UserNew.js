import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import isEmpty from 'lodash/isEmpty';
import * as Yup from 'yup';
import { InputField } from '../shared/Fields';

import { Button } from '../shared';

const UserNew = ({ history, onCreateUser }) => {
  return (
    <Formik
      initialValues={{ 
        username: '',
        email: '', 
        password: '' 
      }}
      validationSchema={
        Yup.object().shape({
          username: Yup.string()
            .min(2, 'Username cannot be so short!')
            .max(50, 'Username cannot be to long!')
            .required('You must add a username!'),
          email: Yup.string()
            .email('Invalid email!')
            .required('You must add an email!'),
          password: Yup.string()
            .min(2, 'Password cannot be so short!')
            .required('You must add a password!')
        })
      }
      onSubmit={ async (values, actions) => {
        const response = await onCreateUser(values);
        if (response.status === 201) {
          actions.resetForm(false);
          history.push('/auth/login');
        } else {
          actions.setSubmitting(false);
          console.log(response.data);
        }
      }}
      render={props => (
        <FormWrapper>
          <Title>Sign Up for a new account!</Title>
          <Form>
            <Field 
              name="username" 
              label="Username" 
              placeholder="Your username" 
              component={InputField} 
            />
            <Field 
              name="email" 
              label="Email" 
              placeholder="Your email" 
              component={InputField} 
            />
            <Field 
              name="password" 
              label="Password" 
              type="password"
              placeholder="Your super secret password!" 
              component={InputField} 
            />
            <Button 
              primary 
              disabled={props.isSubmitting && isEmpty(props.errors)}
              type="submit">
              {props.isSubmitting ? <span>Signing Up...</span> : <span>Join us!</span>}
            </Button>
            <Login>Or <Link to="/auth/login">login</Link> now</Login>
          </Form>
        </FormWrapper>
      )}
    />
  );
}

const FormWrapper = styled('div')`
  box-sizing: border-box;
  width: 30%;
  margin: 0 auto; 
  @media (max-width: 576px) {
    width: 100%;
  }
`

const Title = styled('h1')`
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  margin-bottom: 0;
  text-align: center;
`

const Login = styled('span')`
  margin-left: 20px;
`

export default UserNew;