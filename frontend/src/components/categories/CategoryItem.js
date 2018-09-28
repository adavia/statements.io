import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';

const CategoryItem = ({ category }) => {
  return (  
    <Link to={`/chat/${category._id}`}><Category>{category.name}</Category></Link>
  );
}

const Category = styled('span')`
  padding: 5px;
  border: 1px solid palevioletred;
  font-size: 14px;
  color: palevioletred;
  font-weight: bold;
  margin-right: 5px;
`
 
export default CategoryItem;