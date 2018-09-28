import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { login } from '../../modules/auth';

import Login from '../../components/auth/Login';

class LoginView extends Component {
  onLogin = (values) => {
    return this.props.dispatch(login(values));
  }

  render() {
    const { history } = this.props;
    
    return (
      <Container>
        <Login 
          history={history}
          onLogin={this.onLogin} 
        />
      </Container>
    );
  }
}

const Container = styled('div')` 
  padding: 15px;
`

export default connect()(LoginView);
