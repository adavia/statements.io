import React, { Component, Fragment } from 'react';
import styled from 'react-emotion';
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

import { authenticate, logout } from '../../modules/auth';
import { loadingIndicator } from '../../modules/loaders';

import Header from '../../components/shared/Header';
import Spinner from '../../components/shared/Spinner';

class Private extends Component {
  componentDidMount = async () => {
    const { history, authenticated } = this.props;
    if (!authenticated) {
      const response = await this.props.dispatch(authenticate());
      
      if (response.status !== 200) {
        history.push('/auth/login');
      }
    }
  }

  onLogout = async () => {
    const { history } = this.props;

    const response = await this.props.dispatch(logout());
    if (response.status === 200) {
      history.push('/auth/login');
    }
  }

  render() {
    const { component: Component, ...rest } = this.props;
    
    return (
      <Route component={matchProps => {
        const { currentUser, loading, authenticated } = rest;

        if (loading) {
          return <Spinner />;
        }
        
        return (
          <Container>
            {authenticated && 
              <Fragment>
                <Header currentUser={currentUser} onLogout={this.onLogout} />
                <Sidebar />
                <Content>
                  <Component {...rest} {...matchProps} />
                </Content>
              </Fragment>
            }
          </Container>
        );   
      }} />
    );
  }
}

function mapStateToProps(state) {
  const { authenticated, currentUser } = state.auth;

  const loadingState = loadingIndicator(['AUTH']);
  
  return { 
    loading: loadingState(state),
    authenticated,
    currentUser
  }
}

const Container = styled('div')`
  display: grid;
  min-height: 100vh;
  grid-template-rows: 50px 1fr;
  grid-template-columns: 250px 1fr;
  grid-template-areas: 'sidebar header' 
                       'sidebar content';
`

const Sidebar = styled('aside')`
  grid-area: sidebar;
  background: #F1F1F1;
  grid-column: ${props => props.collapsed ? '1' : '3 / span 3'};
`

const Content = styled('main')`
  grid-area: content;
  grid-column: 1 / span 3;
`

export default withRouter(connect(mapStateToProps)(Private));