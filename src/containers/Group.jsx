import React, { Component } from 'react';

import { Card, Avatar } from '@material-ui/core';

export class Group extends Component {
  render() {
	return (
		<React.Fragment>
			{
				[1,2,3,4,5,6,7,8,9,10].map(x => <Card>
					<Avatar
						style={{width:"100px", height: "100px"}}
						alt="Adelle Charles"
						src={`https://picsum.photos/200/20${x}/?random`}/>
				</Card>)

			}
		</React.Fragment>
	)
  }
}

export default Group;