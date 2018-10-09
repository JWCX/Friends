import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Fade } from '@material-ui/core';

import { NanoMembersIcon } from 'components/AppBarIcons';
import { UserMini } from 'containers';
import Pagination from 'components/Pagination';


class GroupMembers extends Component {
	render() {
		const { group,
			groupMembers,
			currentPage,
			st, ed,
			memberPages,
			handleMembersPagination }  = this.props;
		const pages = [];
		if(memberPages > 5)
			pages.push({text: "<", onClick: ()=>{handleMembersPagination("<")}})
		for(let i=st; i<=ed; i++){
			pages.push({active: currentPage===i, text: i, onClick: ()=>{handleMembersPagination(i)}})
		}
		if(memberPages > 5)
			pages.push({text: ">", onClick: ()=>{handleMembersPagination(">")}})
		return (
			<Fade in={true} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="column"
					justify="space-between"
					alignItems="center"
					style={{width:"300px", height:"777px"}}
					spacing={8}>
					<Grid container
						direction="column"
						justify="center"
						alignItems="flex-start"
						spacing={8}>
						<Grid item>
							<NanoMembersIcon fill="#527a7a"/>
						</Grid>
						{
							_.map(groupMembers, x =>
								<Grid item key={x.id}>
									<UserMini
										id={x.id}
										nickName={x.nickName}
										gender={x.gender}
										image={x.image}
										online={x.online}
										manager={x.id === group.master.id}/>
								</Grid>
							)}
					</Grid>
					<Grid item>
					{
						memberPages > 1 &&
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

export default GroupMembers;



