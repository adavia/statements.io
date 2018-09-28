import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'react-emotion';

const Public = ({ component: Component, ...rest }) => {
  return (
    <Route {...rest} render={matchProps => (
      <Container> 
        <Component {...matchProps} />
      </Container>
    )} />
  )
}

const Container = styled('div')``

export default Public;

