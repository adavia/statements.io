import React, { Component } from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { unloadCategory, fetchUsersAndMessages } from '../../modules/categories';
import { sendMessage, groupMessagesByDate, getMessagesCount } from '../../modules/messages';
import { fetchUsersSelector } from '../../modules/users';
import { loadingIndicator } from '../../modules/loaders';

import UserList from '../../components/users/UserList';
import MessageView from '../../components/messages/MessageView';
import MessageNew from '../../components/messages/MessageNew';
import Spinner from '../../components/shared/Spinner';

let socket;

class CategoryShowView extends Component {
  constructor(props) {
    super(props);

    socket = io('http://localhost:3001/chat', { 
      query: { categoryId: props.computedMatch.params.id },
      transports: ['websocket'] 
    })
  }

  componentDidMount() {
    const { params } = this.props.computedMatch; 
    this.props.dispatch(fetchUsersAndMessages(socket, params.id));
  }

  componentWillUnmount() {
    const { params } = this.props.computedMatch; 
    this.props.dispatch(unloadCategory(socket, params.id));
  }

  onCreateMessage = (values) => {
    const { params } = this.props.computedMatch;
    this.props.dispatch(sendMessage(socket, params.id, values));
  }

  render() {
    const { loading, users, messages, messagesCount } = this.props;

    if (loading) {
      return <Spinner />;
    }
    
    return (
      <Container>
        <Users>
          <UserList users={users} />
        </Users>
        <Content>
          <MessageView messagesCount={messagesCount} messages={messages} />
          <MessageNew onCreateMessage={this.onCreateMessage} />
        </Content>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const loadingState = loadingIndicator(['FETCH_MESSAGES', 'FETCH_USERS']);
  
  return { 
    loading: loadingState(state),
    messages: groupMessagesByDate(state),
    messagesCount: getMessagesCount(state),
    users: fetchUsersSelector(state)
  }
}

const Container = styled('div')`
  display: flex;
  height: 100%;
  padding: 20px;
  flex-wrap: wrap;
`

const Users = styled('div')`
  width: 30%; 
`

const Content = styled('div')`
  display: flex;
  flex-direction: column;
  width: 70%;
`

export default connect(mapStateToProps)(CategoryShowView);