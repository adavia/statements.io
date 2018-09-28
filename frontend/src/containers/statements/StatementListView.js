import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { fetchAll, createStatement, fetchStatementsSelector } from '../../modules/statements';
import { fetchCategoriesSelector } from '../../modules/categories';
import { loadingIndicator } from '../../modules/loaders';

import StatementList from '../../components/statements/StatementList';
import StatementNew from '../../components/statements/StatementNew';
import Spinner from '../../components/shared/Spinner';
import { Button } from '../../components/shared';

class StatementListView extends Component {
  state = {
    showNewStatementForm: false
  }
  
  componentDidMount() {
    this.props.dispatch(fetchAll());
  }

  onCreateStatement = (values) => {
    return this.props.dispatch(createStatement(values));
  }

  toggleNewStatementForm = () => {
    this.setState(prevState => ({
      showNewStatementForm: !prevState.showNewStatementForm
    }))
  }

  render() {
    const { loading, statements, categories } = this.props;
    const { showNewStatementForm } = this.state;

    if (loading) {
      return <Spinner />;
    }
    
    return (
      <Container>
        <Button onClick={this.toggleNewStatementForm}>Create a new statement!</Button>
        {showNewStatementForm && (
          <StatementNew categories={categories} onCreateStatement={this.onCreateStatement} />
        )}
        <StatementList statements={statements} />
      </Container>
    );
  }
}

function mapStateToProps(state) { 
  const loadingState = loadingIndicator(['FETCH_STATEMENTS', 'FETCH_CATEGORIES']);
  
  return { 
    loading: loadingState(state),
    statements: fetchStatementsSelector(state),
    categories: fetchCategoriesSelector(state)
  }
}

const Container = styled('div')` 
  padding: 20px;
`

export default connect(mapStateToProps)(StatementListView);
