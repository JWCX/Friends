import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Fade } from '@material-ui/core';

import { UserMini } from 'containers';
import Pagination from 'components/Pagination';


class MeFriends extends Component {
	render() {
		const { meFriends,
			currentPage,
			st, ed,
			friendsPages,
			handleFriendsPagination }  = this.props;
		const pages = [];
		if(friendsPages > 5)
			pages.push({text: "<", onClick: ()=>{handleFriendsPagination("<")}})
		for(let i=st; i<=ed; i++){
			pages.push({active: currentPage===i, text: i, onClick: ()=>{handleFriendsPagination(i)}})
		}
		if(friendsPages > 5)
			pages.push({text: ">", onClick: ()=>{handleFriendsPagination(">")}})

		return (
			<Fade in={true} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={8}>
					{
						_.map(meFriends, x =>
							<Grid item key={x.id}>
								<UserMini
									id={x.id}
									nickName={x.nickName}
									gender={x.gender}
									image={x.image}
									online={x.online}/>
							</Grid>
						)}
					<Grid item>
					{
						friendsPages > 1 &&
						<Pagination
							pages={pages}
							currentPage={currentPage}
							color="info"
							/>
					}
					</Grid>
				</Grid>
			</Fade>
		)
	}
}

export default MeFriends;



