import React from 'react';
import { Fade, Typography, Grid } from '@material-ui/core';

import { LargeUserAvatar } from 'components/Avatars';
import { Button } from 'components';

class SiteInfo extends React.Component {
	state = {
		showPage: false,	// FadeIn/Out Animaition 처리를 위한 변수
		mount: false
	};

	componentWillMount() {
		setTimeout(() => {
			this.setState({mount: true, showPage: true});
		}, 200);
	}
	handleClick = e => {
		e.preventDefault();
		this.redirectToLogin();
	}
	redirectToLogin = () => {
		this.setState({showPage: false});
		setTimeout(() => {
			this.setState({mount: false});
			setTimeout(() => {
				this.props.history.push('/login');
			}, 50);
		}, 200);
	}
	render() {
		const { showPage, mount } = this.state;
		return (
			<Fade in={showPage} timeout={{enter: 300, exit: 300}}>
			{
				mount ?
					<Grid
						container
						direction="column"
						justify="space-between"
						alignItems="center"
						spacing={24}>
						<Grid item>
							<Typography variant="headline">개발자들</Typography>
						</Grid>
						<Grid item>
							<Grid container direction="row" justify="center" alignItems="center" spacing={24}>
								<Grid item>
									<div style={{height: "170px", width: "150px", textAlign: "center"}}>
										<LargeUserAvatar center
											src="http://picsum.photos/100/101"/>
										<div>최재현</div>
										<div style={{fontSize:"0.8rem"}}>Back-end Developer</div>
									</div>
								</Grid>
								<Grid item>
									<div style={{height: "170px", width: "150px", textAlign: "center"}}>
										<LargeUserAvatar center
											src="http://picsum.photos/100/100"/>
										<div>성기훈</div>
										<div style={{fontSize:"0.8rem"}}>Back-end Developer</div>
									</div>
								</Grid>
								<Grid item>
									<div style={{height: "170px", width: "150px", textAlign: "center"}}>
										<LargeUserAvatar center
											src="https://avatars2.githubusercontent.com/u/38662232?s=460&v=4"/>
										<div>권샘찬</div>
										<div style={{fontSize:"0.8rem"}}>Back-end Developer</div>
									</div>
								</Grid>
							</Grid>
							<Grid container direction="row" justify="center" alignItems="center" spacing={24}>
								<Grid item>
									<div style={{height: "170px", width: "150px", textAlign: "center"}}>
										<LargeUserAvatar center
											src="https://www.jacksonandperkins.com/images/xxl/37940.jpg"/>
										<div>김성연</div>
										<div style={{fontSize:"0.8rem"}}>Project Manager<br/>Database Administrator</div>
									</div>
								</Grid>
								<Grid item>
									<div style={{height: "170px", width: "150px", textAlign: "center"}}>
										<LargeUserAvatar center
											src="https://avatars0.githubusercontent.com/u/36601374?s=460&v=4"/>
										<div>조정우</div>
										<div style={{fontSize:"0.8rem"}}>Project Lead<br/>Front-end Developer</div>
									</div>
								</Grid>
							</Grid>
						</Grid>
						<Grid item>
							<Button
							type="button"
							onClick={this.handleClick}
							margin="30px 0 0 0">
								돌아가기
							</Button>
						</Grid>
					</Grid>
				: <span></span>
			}
			</Fade>
		);
	}
}

export default SiteInfo;