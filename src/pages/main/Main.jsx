import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { Grid } from '@material-ui/core';
import styled from 'styled-components';

import { AppBar,
		Messenger
	} from 'containers'; // FIXME: pages MUST IMPORT containers ONLY!! THIS IS FOR TESTING
import { Board,
		Users,
		Groups,
		Me,
	} from 'pages';

const Container = styled.div`
	display: flex;
	flex-flow: row;
	width: 90vw;
	margin-left: 5vw;
`
const Div = styled.div`
	/* background: rgba(255,0,0,0.1); */
	margin: 2px 1px 0 2px;
	flex-grow: ${props => props.grow};
	transition: flex-grow 300ms linear;
`

class Main extends Component {
	state = {
		index: 0,	// 현재 Tab의 index. 0:Main, 1:Board, 2:Users, 3:Group
		openMessenger: false,	// true시 메신저 활성화
		left: 10,
		right: 0.1
	}

	componentDidMount() {
		switch(this.props.location.pathname) {	// 새로고침시 Tab Index설정
			case "/":		return this.setState({index: 0});
			case "/board":	return this.setState({index: 1});
			case "/users":	return this.setState({index: 2});
			case "/groups":	return this.setState({index: 3});
			default:
		}
	}
	handleChangeTab = (e, index) => {
		this.setState({index});
		switch(index) {
			case 0:
				return this.props.history.push("/");
			case 1:
				return this.props.history.push("/board");
			case 2:
				return this.props.history.push("/users");
			case 3:
				return this.props.history.push("/groups");
			default:
		}
	}
	handleToggleMessenger = () => {
		console.log(this.state);
		if(this.state.openMessenger)
			this.setState({
				openMessenger: false,
				left: 10,
				right: 0.001,
			});
		else
			this.setState({
				openMessenger: true,
				left: 10,
				right:3
			});
	}
	render() {
		const { index, openMessenger, left, right } = this.state;
		const { me } = this.props;
		return (
			<React.Fragment>
				<AppBar
					position="sticky"
					index={index}
					handleChangeTab={this.handleChangeTab}
					handleToggleMessenger={this.handleToggleMessenger}
					/>
				<Container onClick={(e)=>{console.log(e.target)}}>
					<Div grow={left}>
						<Route exact path="/" render={() =>
							[1,2,3,4,5,6,7,8,9,10,
							11,12,13,14,15,16,17,18,19,20,
							21,22,23,24,25,26,27,28,29,30].map(x => <h1 key={x}>메인페이지{x}</h1>)
						}/>
						<Route path="/board" render={() =>
							<Board/>
						}/>
						<Route path="/users" render={() =>
							<Users/>
						}/>
						<Route path="/groups" render={() =>
							<Groups/>
						}/>
					</Div>
					<Div grow={right}>
						<Messenger open={openMessenger}/>
					</Div>
				</Container>
				<Me open={me}/>
			</React.Fragment>
		);
	}
}

const mapStateToProps = state => ({
	me: state.me,
})
const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
