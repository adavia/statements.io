import React from 'react';
import styled from 'react-emotion';

const Container = styled('div')`
	padding: 10px;
	&:first-child {
		padding-top: 0;
	}
	&:last-child {
		margin-bottom: 0;
	}
`

const Text = styled('div')`
  font-size: 14px;
`

const Username = styled('div')`
  font-weight: 800;
  font-size: 16px;
  color: grey;
`
	
const MessageItem = ({ message }) => {
  return (
    <Container bg="#f8f8f8">
      <Text>
        <Username>{message.user.username} said</Username> {message.content}
      </Text>
    </Container>
  )
}

export default MessageItem