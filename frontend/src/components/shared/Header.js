import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'react-emotion';

const Header = ({ currentUser, onLogout }) => {
  return (  
    <Container>
      <Content>
        <UserSettings>Hi!, {currentUser.email} - <Logout onClick={onLogout}>log out</Logout></UserSettings>
        <Link to="/"><Logo>Statement</Logo></Link>
      </Content>
    </Container>
  );
}

const Container = styled('header')`
  grid-area: header;
  background: #a858ad;
  grid-column: 1 / span 3;
  a {
    text-decoration: none;
    color: inherit;
  }
`

const Content = styled('div')`
  color: #FFF;
  font-size: 15px;
  padding: 15px 20px;
`

const Logo = styled('h1')`
  margin: 0;
  line-height: 0.8;
  font-family: 'Oswald', sans-serif;
  font-size: 1.5em;
`

const Logout = styled('span')`
  font-weight: bold;
  cursor: pointer;
`

const UserSettings = styled('p')`
  margin: 0;
  float: right;
`
 
export default Header;