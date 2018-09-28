import React, { Component } from 'react';
import styled from 'react-emotion';

import CategoryItem from './CategoryItem';

class CategoryList extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.categories.length === nextProps.categories.length) {
      return false;
    }

    return true;
  }

  render() {
    const { categories } = this.props;

    return (
      <Container>
        {categories.map(category => 
          <CategoryItem key={category._id} category={category} />
        )}
      </Container>
    );
  }
}

const Container = styled('div')`
  margin-top: 15px;
  a {
    text-decoration: none;
  }
`
 
export default CategoryList;