import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { JoinForm, LoginForm, AmnesiaForm, SiteInfo } from 'containers';

const styles = {
	root : {
		position: "relative",
		top: "40%",
		transform: "translateY(-50%)",
		margin: "auto",
		minWidth: "350px",
		width: "80vw",
		maxWidth: "400px",
		borderRadius: "10px",
		padding: "30px",
		transition: "all 0.2s ease-in-out"
	},
}

class Landing extends Component {
	state = {
		idError:0,
		pwError:0,
		pw2Error:0,
	}
	handleCountError = errors => {
		this.setState(state => ({...state, ...errors}));
	}
	render() {
		const style = {height: _.reduce(this.state, (x,y) => x+y)*12};
		switch(this.props.match.url){
			case "/login":
				style.height += 370;
				break;
			case "/join":
				style.height += 335;
				break;
			case "/amnesia":
				style.height += 220;
				break;
			case "/info":
				style.height += 600;
				style.maxWidth = 1000;
				style.top = "50%";
			break;
			default:
		}
		return (
			<div>
				<div style={{height:"100vh",
						background:"url(https://picsum.photos/1920/1080/?blur&gravitiy=east&random)"}}>
					{/* TODO: DELETE MAIN BUTTON AFTER TEST */}
					{/* <Link to="/"><button>to main</button></Link> */}
					<Paper elevation={10}
						classes={{root: this.props.classes.root}}
						style={style}>
						<Route exact path="/login" render={() =>
							<LoginForm {...this.props} {...this.state} countError={this.handleCountError}/>
						}/>
						<Route exact path="/join" render={() =>
							<JoinForm {...this.props} {...this.state} countError={this.handleCountError}/>
						}/>
						<Route exact path="/amnesia" render={() =>
							<AmnesiaForm {...this.props} {...this.state} countError={this.handleCountError}/>
						}/>
						<Route exact path="/info" render={() =>
							<SiteInfo {...this.props} {...this.state} countError={this.handleCountError}/>
						}/>
					</Paper>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Landing);
