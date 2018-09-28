import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { InputField } from '../shared/Fields';

import { Button } from '../shared';

const Login = ({ history, onLogin, }) => {
  return (
    <Formik
      initialValues={{ 
        email: '', 
        password: '' 
      }}
      onSubmit={ async (values, actions) => {
        const response = await onLogin(values);
        if (response.status === 200) {
          history.push('/');
        } else {
          actions.setSubmitting(false);
        }
      }}
      render={props => (
        <FormWrapper>
          <Title>Sign In to the site!</Title>
          <Form>
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
              disabled={props.isSubmitting}
              type="submit">
              {props.isSubmitting ? <span>Signing in...</span> : <span>Start the fun now!</span>}
            </Button>
            <Register>Or <Link to="/users/new">register</Link> now</Register>
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

const Register = styled('span')`
  margin-left: 20px;
`

export default Login;