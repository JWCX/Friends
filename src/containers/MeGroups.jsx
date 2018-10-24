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
				<React.Fragment>
					{
						Object.keys(meGroups).length ?
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
							</Grid>
							: <div style={{position:"relative", width:"300px", color:"rgb(120,120,120)", top: "50%", textAlign:"center", transform: "translateY(-50%)"}}>가입한 그룹이 없습니다</div>
					}
					{
						groupsPages > 1 &&
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

export default MeGroups;