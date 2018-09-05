import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { JoinForm, LoginForm, AmnesiaForm } from 'containers';

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
		let height = _.reduce(this.state, (x,y) => x+y)*12;
		console.log(height);
		switch(this.props.match.url){
			case "/login":
				height += 360;
				break;
			case "/join":
				height += 335;
				break;
			case "/amnesia":
				height += 220;
				break;
			case "/info":
				height += 900;
			break;
			default:
		}
		return (
			<div>
				{/* TODO: DELETE AFTER TEST */}
				<div style={{height:"100vh",
						background:"url(https://picsum.photos/1920/1080/?blur&gravitiy=east&random)"}}>
					<Link to="/"><button>to main</button></Link>
					<Paper elevation={10}
						classes={{root: this.props.classes.root}}
						style={{height}}>
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
							<JoinForm {...this.props} {...this.state} countError={this.handleCountError}/>
						}/>
					</Paper>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Landing);
