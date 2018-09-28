import React, { PureComponent } from 'react';
import styled from 'react-emotion';

import StatementItem from './StatementItem';

class StatementList extends PureComponent {
  render() {
    const { statements } = this.props;

    return (
      <Container>
        {statements.map(statement => 
          <StatementItem key={statement._id} statement={statement} />
        )}
      </Container>
    );
  }
}

const Container = styled('div')`
  margin-top: 5px;
`
 
export default StatementList;