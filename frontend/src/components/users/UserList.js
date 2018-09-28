import React from 'react';
import styled from 'react-emotion';

const UserList = ({ users }) => {
  return ( 
    <Container>
      {users.map(user =>
				<UserItem key={user._id}>
					<Text>{user.username}</Text>
				</UserItem>
			)}
    </Container>
  );
}

const Container = styled('div')`
	background: #FFF;
	flex: 1 0 auto; 
	padding: 0 1rem 0 0;
	@media (min-width: 40em) {
		border-right: 1px solid #DDD;
	}
`

const Text = styled('span')``

const UserItem = styled('div')`
	background: #f7f7f7;
	padding: 10px;
	border-radius: 3px;
	margin-bottom: 1rem;
	display: flex;
	&:last-child {
		margin-bottom: 0;
	}
`
 
export default UserList;