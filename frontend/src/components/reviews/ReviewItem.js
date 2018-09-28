import React from 'react';
import styled from 'react-emotion';

const ReviewItem = ({ review }) => {
  return (
    <Container>
      <Author>
        {review.username} said: 
      </Author>
      <Content>
        {review.content}
      </Content>
    </Container>
  );
}

const Container = styled('div')`
  padding: 15px;
  background: #F2F2F2;
  margin: 10px 0;
  width: 60%;
`

const Author = styled('h4')`
  font-weight: bold;
  display: inline;
`

const Content = styled('span')`
  font-size: 15px;
  margin-left: 10px;
`
 
export default ReviewItem;