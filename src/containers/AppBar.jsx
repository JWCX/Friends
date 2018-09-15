import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { AppBar,
		Toolbar,
		Tabs,
		Tab,
		IconButton,
		Grid,
	} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { LogoIcon,
		BoardIcon,
		UsersIcon,
		GroupsIcon,
		MeIcon,
		NotificationIcon,
		MessangerIcon,
		RequestIcon,
		MoreIcon,
	} from 'components/AppBarIcons'

const styles = {
	root: {
		opacity:0.5,
	},
	selected: {
		fontSize:"1.1em"
	}
}

class MyAppBar extends Component {
	shouldComponentUpdate(nextProps) {
		if (this.props.index !== nextProps.index)
			return true;
		else return false;
	}
	handleOpenMe = () => {
		console.log(this.props.match);
		let url = `${this.props.match.url}/me/${this.props.token}`;
		if(this.props.match.url === "/")
			url = `${this.props.match.url}me/${this.props.token}`;
		this.props.history.push(url);
	}
	render() {
		const { classes, index, position,
			handleChangeTab,
			handleToggleMessenger } = this.props;
		return (
			<AppBar
				position={position}
				style={{background:"white"}}
				>
				<Toolbar
					variant="regular">
					<Grid container
						direction="row"
						justify="space-between"
						alignItems="center"
						spacing={0}>
						<Grid item>
							<Tabs
								value={index}
								onChange={handleChangeTab}
								>
								<Tab icon={<LogoIcon selected={index===0}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
								<Tab icon={<BoardIcon selected={index===1}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
								<Tab icon={<UsersIcon selected={index===2}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
								<Tab icon={<GroupsIcon selected={index===3}/>}
									classes={{root: classes.root, selected: classes.selected}}/>
							</Tabs>
						</Grid>
						<Grid item>
							<Grid container
								direction="column"
								justify="space-around"
								alignItems="flex-end"
								spacing={0}>
								<Grid item>
									<p style={{margin:"10px 0 0 0"}}>여기엔 뭐가들어가야 할까?</p>
								</Grid>
								<Grid item>
									<IconButton onClick={this.handleOpenMe}>
										<MeIcon/>
									</IconButton>
									<IconButton>
										<NotificationIcon/>
									</IconButton>
									<IconButton>
										<RequestIcon/>
									</IconButton>
									<IconButton onClick={handleToggleMessenger}>
										<MessangerIcon/>
									</IconButton>
									<IconButton>
										<MoreIcon/>
									</IconButton>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Toolbar>
			</AppBar>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token
})
const mapDispatchToProps = {

}

export default  withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(MyAppBar)));