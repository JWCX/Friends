import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Fade } from '@material-ui/core';

import { GroupMini } from 'containers';
import Paginations from 'components/Pagination';

class MeGroups extends Component {
	state = {

	}
	render() {
		return (
			<Fade in={true} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={8}>
					{
						[{groupName: "그룹 이름", image: "https://picsum.photos/800/800/?random"},
						{groupName: "리스트", image: "https://picsum.photos/800/801/?random"},
						{groupName: "입니다", image: "https://picsum.photos/802/800/?random"},
						{groupName: "미스터ㅁㄴㄹ ㅁㄴㄹ ㅁㄴ ㄻㄴ ㄻㄴㄻ 피자", image: "https://picsum.photos/801/800/?random"},
						{groupName: "피자헛", image: "https://picsum.photos/800/803/?random"},
						{groupName: "알볼로피자", image: "https://picsum.photos/802/800/?random"},
						{groupName: "피자에땅", image: "https://picsum.photos/804/800/?random"},
						{groupName: "피제리아디부자", image: "https://picsum.photos/805/800/?random"},
						{groupName: "피자스쿨", image: "https://picsum.photos/800/804/?random"},
						{groupName: "피자마루", image: "https://picsum.photos/800/805/?random"},
						].map(x =>
						<Grid item>
							<GroupMini groupName={x.groupName} image={x.image}/>
						</Grid>
					)}
					<Grid item>
						<Paginations
							pages={[
								{ text: "<" },
								{ active: true, text: 1 },
								{ text: 2 },
								{ text: 3 },
								{ text: 4 },
								{ text: 5 },
								{ text: ">" },
							]}
							color="info"
							/>
					</Grid>
				</Grid>
			</Fade>
		)
	}
}


const mapStateToProps = state => ({
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(MeGroups);



