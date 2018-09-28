import React from 'react';
import styled from 'react-emotion';

export const Button = (props) => {
  return (
    <CustomButton {...props}>
      {props.children}
    </CustomButton>
  );
}

const CustomButton = styled('button')`
  background: ${props => props.primary ? "palevioletred" : "white"};
  color: ${props => props.primary ? "white" : "palevioletred"};
  cursor: pointer;
  font-size: 15px;
  padding: 0.40em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  outline: none;
  &:active {
    background: ${props => props.primary ? "#f4d4de" : "white"};
    color: ${props => props.primary ? "white" : "#f4d4de"}; 
  }
  &:hover, &:disabled {
    background: ${props => props.primary && "#f4d4de"};
    color: ${props => props.primary && "palevioletred"}; 
  }
`