import React from 'react';
import styled from 'react-emotion';
import Spinner from 'react-spinkit';

const SpinnerLoader = (props) => {
  return ( 
    <Container>
      <Spinner 
        fadeIn="half"
        name="ball-scale-multiple" 
        color="palevioletred"
      />
    </Container>
  );
}

const Container = styled('div')`
  box-sizing: border-box;
  width: 0;
  margin: 5em auto; 
`

export default SpinnerLoader;