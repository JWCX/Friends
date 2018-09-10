import React, { Component } from 'react';

import { Filter, User } from 'containers';

export class Users extends Component {


	render() {
		const userList = [];
		for(let i=1; i<=20; i++)
			userList.push(<User key={i} id={i}></User>);
		return (
			<div>
				<Filter>닉네임</Filter>
					{userList.map(user => user)}
			</div>
		)
	}
}

export default Users;
