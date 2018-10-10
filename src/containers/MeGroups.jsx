import React, { Component } from 'react';
import _ from 'lodash';
import { Grid, Fade } from '@material-ui/core';

import { GroupMini } from 'containers';
import Pagination from 'components/Pagination';

class MeGroups extends Component {
	render() {
		const { meGroups,
			currentPage,
			st, ed,
			groupsPages,
			handleGroupsPagination }  = this.props;
		const pages = [];
		if(groupsPages > 5)
			pages.push({text: "<", onClick: ()=>{handleGroupsPagination("<")}})
		for(let i=st; i<=ed; i++){
			pages.push({active: currentPage===i, text: i, onClick: ()=>{handleGroupsPagination(i)}})
		}
		if(groupsPages > 5)
			pages.push({text: ">", onClick: ()=>{handleGroupsPagination(">")}})

		return (
			<Fade in={true} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={8}>
					{
						_.map(meGroups, x =>
							<Grid item key={x.id}>
								<GroupMini id={x.id} groupName={x.groupName} image={x.image}/>
							</Grid>
						)}
					<Grid item>
					{
						groupsPages > 1 &&
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

export default MeGroups;