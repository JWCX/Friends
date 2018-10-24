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
				<React.Fragment>
					{
						Object.keys(meFriends).length ?
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
							</Grid>
							: <div style={{position:"relative", width:"300px", color:"rgb(120,120,120)", top: "50%", textAlign:"center", transform: "translateY(-50%)"}}>아직 친구가 없습니다</div>
					}
					{
						friendsPages > 1 &&
						<div style={{position:"absolute", bottom: "0px", left: "50%", transform: "translateX(-50%)"}}>
							<Pagination
								pages={pages}
								currentPage={currentPage}
								color="info"
								/>
						</div>
					}
				</React.Fragment>
			</Fade>
		)
	}
}

export default MeFriends;



