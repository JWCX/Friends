import React from 'react';
import Axios from 'axios';
import { Fade, Typography, Grid } from '@material-ui/core';

import { TextField, Button, Dialog } from 'components';

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
				<Grid container direction="column" justify="center" alignItems="center" spacing={16}>
					<Grid item>
						<Typography variant="headline">FRIENDS</Typography>
					</Grid>
					<Grid item>
						<Typography variant="subheading">내용은</Typography>
						<Typography variant="body2">Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							mollit anim id est laborum.
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="subheading">이곳에</Typography>
						<Typography variant="body2">Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
							consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="subheading">입력</Typography>
						<Typography variant="body2">Lorem ipsum dolor sit amet,
						consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
							nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
							mollit anim id est laborum.
						</Typography>
					</Grid>
					<Grid item>
						<Typography variant="subheading">개발자들</Typography>
						<Grid container direction="row" justify="center" alignItems="center" spacing={24}>
							<Grid item>
								<Typography variant="body2">AVATAR는 이곳에</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2">AVATAR는 이곳에</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2">AVATAR는 이곳에</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2">AVATAR는 이곳에</Typography>
							</Grid>
							<Grid item>
								<Typography variant="body2">AVATAR는 이곳에</Typography>
							</Grid>
						</Grid>
					</Grid>
					<Grid item>
						<Button
						type="button"
						onClick={this.handleClick}
						margin="30px 5px 5px 5px"
						autoFocus>
							돌아가기
						</Button>
					</Grid>
				</Grid> : <span></span>
			}
			</Fade>
		);
	}
}

export default SiteInfo;