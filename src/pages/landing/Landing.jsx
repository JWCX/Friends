import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';

import { JoinForm, LoginForm } from 'containers';

class Landing extends Component {
	render() {
		return (
			<div>
				{/* TODO: DELETE AFTER TEST */}
				{/* TODO: 배경이미지 넣을것.. */}
				<Link to="/"><button>to main</button></Link>
				<Route exact path="/login" component={LoginForm}/>
				<Route exact path="/join" component={JoinForm}/>
			</div>
		);
	}
}

export default Landing;
