import React from 'react';
import { css } from 'emotion';
import styled from 'react-emotion';
import Select from 'react-select';

export const InputField = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name];
  return (
    <Container error={hasError}>
      {props.label && <Label>{props.label}</Label>}
      <Input {...field} {...props} />
      {hasError && <Error>{errors[field.name]}</Error>}
    </Container>
  );
}

export const TextField = ({
  field,
  form: { touched, errors },
  ...props
}) => {
  const hasError = touched[field.name] && errors[field.name];
  return (
    <Container error={hasError}>
      {props.label && <Label>{props.label}</Label>}
      <TextArea {...field} {...props} />
      {hasError && <Error>{errors[field.name]}</Error>}
    </Container>
  );
}

export const SelectField = ({
  field,
  form: { touched, errors, setFieldValue, setFieldTouched },
  ...props
}) => {
  const onSetValue = option => {
    setFieldValue(field.name, option)
  }

  const onSetTouched = option => {
    setFieldTouched(field.name, option.value)
  }

  const hasError = touched[field.name] && errors[field.name];
  
  return (
    <Container error={hasError}>
      {props.label && <Label>{props.label}</Label>}
      <Select 
        styles={selectStyles} 
        {...field} 
        {...props} 
        error={hasError}
        onChange={onSetValue}
        onBlur={onSetTouched}
      />
      {hasError && <Error>{errors[field.name]}</Error>}
    </Container>
  );
}

const Container = styled('div')`
  margin: 15px 0;
  label {
    color: ${props => props.error && "tomato"};
  }
  input, textarea {
    border-color: ${props => props.error && "tomato"}
  }
`

const Label = styled('label')`
  display: block;
  font-size: 15px;
  margin-bottom: 5px;
`

const inputStyles = css`
  display: flex;
  box-sizing: border-box;
  border: 1px solid #CCCCCC;
  border-radius: 3px;
  font-size: 14px;
  width: 100%;
  background-color: white;
  min-height: 38px;
  padding: 9px;
  outline: none;
  &::placeholder {
    color: #CCCCCC;
  }
`

const selectStyles = {
  control: (styles, { selectProps }) => css`
    display: flex;
    box-sizing: border-box;
    border: 1px solid ${selectProps.error ? "tomato" : "#CCCCCC"};
    border-radius: 3px;
    font-size: 14px;
    width: 100%;
    background-color: white;
    min-height: 38px;
    outline: none;
  `,
  placeholder: styles => ({ ...styles, color: "#CCCCCC" }),
};

const Input = styled('input')`
  ${inputStyles};
`

const TextArea = styled('textarea')`
  ${inputStyles};
`

const Error = styled('span')`
  font-size: 14px;
  color: tomato;
  margin-top: 5px;
`


