import React, { Component } from 'react';
import styled from 'react-emotion';

import ReviewItem from './ReviewItem';

class ReviewList extends Component {
  shouldComponentUpdate(nextProps) {
    if (this.props.reviews.length === nextProps.reviews.length) {
      return false;
    }

    return true;
  }

  render() {
    const { reviews } = this.props;
    
    return (
      <Container>
        {reviews.map(review => 
          <ReviewItem key={review._id} review={review} />
        )}
      </Container>
    );
  }
}

const Container = styled('div')`
  margin: 20px 0;
`
 
export default ReviewList;