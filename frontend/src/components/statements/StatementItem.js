import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';

import CategoryList from '../categories/CategoryList';

const StatementItem = ({ statement }) => {
  return (
    <Item>
      <Link to={`/statements/${statement._id}`}><Title>{statement.title}</Title></Link>
      <Description>{statement.description}</Description>
      <Author>created by {statement.author && statement.author.username}</Author>
      <CategoryList categories={statement.categories} />
    </Item>
  );
}

const Item = styled('article')`
  border-bottom: 1px solid #F1F1F1;
  padding: 15px 0;
  a {
    text-decoration: none;
    color: inherit;
  }
  &:last-child {
    border-bottom: none;
  }
`

const Title = styled('h1')`
  font-family: 'Oswald', sans-serif;
  font-size: 2rem;
  margin: 0;
  line-height: 1;
`

const Author = styled('div')`
  font-size: 15px;
`

const Description = styled('p')`
  margin: 6px 0 0 0;
`

export default StatementItem;