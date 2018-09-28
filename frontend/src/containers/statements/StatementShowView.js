import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { 
  selectAll, 
  updateStatement, 
  getStatementSelector, 
  getReviewsByStatementSelector,
  getCategoriesByStatementSelector
} from '../../modules/statements';

import { fetchCategoriesSelector } from '../../modules/categories';
import { createReview } from '../../modules/reviews';
import { loadingIndicator } from '../../modules/loaders';

import StatementShow from '../../components/statements/StatementShow';
import StatementEdit from '../../components/statements/StatementEdit';
import ReviewNew from '../../components/reviews/ReviewNew';
import ReviewList from '../../components/reviews/ReviewList';
import Spinner from '../../components/shared/Spinner';
import { Button } from '../../components/shared';

class StatementShowView extends Component {
  state = {
    showNewReviewForm: false,
    showEditStatementForm: false
  }

  componentDidMount() {
    const { params } = this.props.computedMatch; 
    this.props.dispatch(selectAll(params.id));
  }

  onCreateReview = (values) => {
    const { params } = this.props.computedMatch;
    return this.props.dispatch(createReview(params.id, values));
  }

  onUpdateStatement = (values) => {
    const { params } = this.props.computedMatch; 
    this.props.dispatch(updateStatement(params.id, values));
  }

  toggleNewReviewForm = () => {
    this.setState(prevState => ({
      showNewReviewForm: !prevState.showNewReviewForm
    }));
  }

  toggleEditStatementForm = () => {
    this.setState(prevState => ({
      showEditStatementForm: !prevState.showEditStatementForm
    }));
  }

  renderActions = () => {
    return (
      <Fragment>
        <Button onClick={this.toggleNewReviewForm}>
          Leave a review!
        </Button>
        <Button onClick={this.toggleEditStatementForm} style={{marginLeft: 10}}>
          Update this statement
        </Button>
      </Fragment>
    )
  }

  render() {
    const { statement, categories, statementCategories, reviews, loading } = this.props;
    const { showNewReviewForm, showEditStatementForm } = this.state;

    if (loading) {
      return <Spinner />;
    }
    
    return (
      <Container>
        <StatementShow categories={statementCategories} statement={statement} />
        {this.renderActions()}
        {showEditStatementForm && 
          <StatementEdit 
            categories={categories} 
            statementCategories={statementCategories}  
            statement={statement} 
            onUpdateStatement={this.onUpdateStatement} 
          />
        }
        <ReviewList reviews={reviews} />
        {showNewReviewForm && <ReviewNew onCreateReview={this.onCreateReview} />}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const loadingState = loadingIndicator(['SELECT_STATEMENT', 'FETCH_CATEGORIES']);
  
  return { 
    loading: loadingState(state),
    categories: fetchCategoriesSelector(state),
    statement: getStatementSelector(state),
    statementCategories: getCategoriesByStatementSelector(state),
    reviews: getReviewsByStatementSelector(state)
  }
}

const Container = styled('div')` 
  padding: 20px;
`

export default connect(mapStateToProps)(StatementShowView);