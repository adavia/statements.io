import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { createUser } from '../../modules/users';

import UserNew from '../../components/users/UserNew';

class UserNewView extends Component {
  onCreateUser = (values) => {
    return this.props.dispatch(createUser(values));
  }

  render() {
    const { history } = this.props;
    
    return (
      <Container>
        <UserNew
          history={history}
          onCreateUser={this.onCreateUser} 
        />
      </Container>
    );
  }
}

const Container = styled('div')` 
  padding: 15px;
`

export default connect()(UserNewView);
