import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import _ from 'lodash';

import { Filter, UserLarge } from 'containers';

export class Users extends Component {
	render() {
		const { users } = this.props;
		return (
			<div>
				<Filter path="users">닉네임</Filter>
				<div style={{height:"55px"}}></div>
				<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					spacing={8}>
					{
						users && _.map(users, user =>
							<Grid item style={{width: "50%", minWidth: "390px"}}>
								<UserLarge key={user.id}
									id={user.id}
									nickName={user.nickName}
									image={user.image}
									age={user.age}
									si={user.si}
									gu={user.gu}
									interests={user.interests}
									gender={user.gender}/>
							</Grid>
						)
					}
				</Grid>
			</div>
		)
	}
}


const mapStateToProps = state => ({
	users: state.mainUsers
})
const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
