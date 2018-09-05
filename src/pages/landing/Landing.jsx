import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import { connect } from 'react-redux';

import { userLoggedIn } from 'actions';
import { JoinForm, LoginForm } from 'containers';

class Landing extends Component {
	render() {
		console.log(this);
		return (
			<div>
				<Link to="/"><button>to main</button></Link>
				<Route exact path="/login" component={LoginForm}/>
				<Route exact path="/join" component={JoinForm}/>
				<button onClick={() => {
					const data ={
						dataSi: {},
						dataGu: {},
						dataInterest: {},
						token: "helloworlda"
					}
					this.props.userLoggedIn(data);
				}}>로그인처리</button>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	token : state.token
})

const mapDispatchToProps = {
	userLoggedIn
}

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
