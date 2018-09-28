import React, { PureComponent } from 'react';
import styled from 'react-emotion';
import CategoryList from '../categories/CategoryList';

class StatementShow extends PureComponent {
  render() {
    const { statement, categories } = this.props;

    return (
      <Container>
        <Title>{statement.title}</Title>
        <Description>{statement.description}</Description>
        <CategoryList categories={categories} />
      </Container>
    );
  }
}
 
const Container = styled('div')`
  margin-bottom: 25px;
`

const Title = styled('h1')`
  font-family: 'Oswald', sans-serif;
  font-size: 3rem;
  margin: 0;
  line-height: 1;
`

const Description = styled('p')`
  margin: 6px 0 0 0;
`

export default StatementShow;