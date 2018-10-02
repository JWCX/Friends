import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Axios from 'axios';
import { Grid, CircularProgress } from '@material-ui/core';

import { updateMainUsers,
	setHasMorePages,
	setNextPageNum } from 'actions';
import { Dialog } from 'components';
import { Filter, UserLarge } from 'containers';

export class Users extends Component {
	state = {
		loadingContents: false,

		users: [],

		dialogOpen: false,
		dialogIcon: null,
		dialogTitle: "",
		dialogContent: ""
	}

	users = {
		1: { id: 1, nickName: "user1", image: "https://picsum.photos/210/300/?random", age: 23, si: 1, gu: 2, interests: [1,4,5], gender: 2 },
		2: { id: 1, nickName: "user2", image: "https://picsum.photos/211/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,1,4,5], gender: 1 },
		3: { id: 1, nickName: "user3", image: "https://picsum.photos/212/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		4: { id: 1, nickName: "user4", image: "https://picsum.photos/213/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,1,4,5], gender: 1 },
		5: { id: 1, nickName: "user5", image: "https://picsum.photos/214/300/?random", age: 23, si: 1, gu: 2, interests: [1,6,2,4,5], gender: 1 },
		6: { id: 1, nickName: "user6", image: "https://picsum.photos/215/300/?random", age: 23, si: 1, gu: 2, interests: [1,3,4,5], gender: 1 },
		7: { id: 1, nickName: "user7", image: "https://picsum.photos/216/300/?random", age: 23, si: 1, gu: 2, interests: [1,3,4,5], gender: 1 },
		8: { id: 1, nickName: "user8", image: "https://picsum.photos/217/300/?random", age: 23, si: 1, gu: 2, interests: [1,3,4,5], gender: 1 },
		9: { id: 1, nickName: "user9", image: "https://picsum.photos/218/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		10: { id: 1, nickName: "user10", image: "https://picsum.photos/219/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		11: { id: 1, nickName: "user11", image: "https://picsum.photos/220/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		12: { id: 1, nickName: "user12", image: "https://picsum.photos/221/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		13: { id: 1, nickName: "user13", image: "https://picsum.photos/222/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		14: { id: 1, nickName: "user14", image: "https://picsum.photos/223/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		15: { id: 1, nickName: "user15", image: "https://picsum.photos/224/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		16: { id: 1, nickName: "user16", image: "https://picsum.photos/225/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		17: { id: 1, nickName: "user17", image: "https://picsum.photos/226/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		18: { id: 1, nickName: "user18", image: "https://picsum.photos/227/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		19: { id: 1, nickName: "user19", image: "https://picsum.photos/228/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		20: { id: 1, nickName: "user20", image: "https://picsum.photos/229/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		21: { id: 1, nickName: "user21", image: "https://picsum.photos/230/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		22: { id: 1, nickName: "user22", image: "https://picsum.photos/231/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		23: { id: 1, nickName: "user23", image: "https://picsum.photos/232/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		24: { id: 1, nickName: "user24", image: "https://picsum.photos/233/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		25: { id: 1, nickName: "user25", image: "https://picsum.photos/234/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		26: { id: 1, nickName: "user26", image: "https://picsum.photos/235/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		27: { id: 1, nickName: "user27", image: "https://picsum.photos/236/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		28: { id: 1, nickName: "user28", image: "https://picsum.photos/237/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		29: { id: 1, nickName: "user29", image: "https://picsum.photos/238/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		30: { id: 1, nickName: "user30", image: "https://picsum.photos/239/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		31: { id: 1, nickName: "user31", image: "https://picsum.photos/240/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		32: { id: 1, nickName: "user32", image: "https://picsum.photos/241/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		33: { id: 1, nickName: "user33", image: "https://picsum.photos/242/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		34: { id: 1, nickName: "user34", image: "https://picsum.photos/243/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		35: { id: 1, nickName: "user35", image: "https://picsum.photos/244/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		36: { id: 1, nickName: "user36", image: "https://picsum.photos/245/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		37: { id: 1, nickName: "user37", image: "https://picsum.photos/246/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		38: { id: 1, nickName: "user38", image: "https://picsum.photos/247/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		39: { id: 1, nickName: "user39", image: "https://picsum.photos/248/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		40: { id: 1, nickName: "user40", image: "https://picsum.photos/249/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		41: { id: 1, nickName: "user41", image: "https://picsum.photos/250/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		42: { id: 1, nickName: "user42", image: "https://picsum.photos/251/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		43: { id: 1, nickName: "user43", image: "https://picsum.photos/252/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		44: { id: 1, nickName: "user44", image: "https://picsum.photos/253/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		45: { id: 1, nickName: "user45", image: "https://picsum.photos/254/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		46: { id: 1, nickName: "user46", image: "https://picsum.photos/255/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		47: { id: 1, nickName: "user47", image: "https://picsum.photos/256/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		48: { id: 1, nickName: "user48", image: "https://picsum.photos/257/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		49: { id: 1, nickName: "user49", image: "https://picsum.photos/258/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		50: { id: 1, nickName: "user50", image: "https://picsum.photos/259/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		51: { id: 1, nickName: "user51", image: "https://picsum.photos/260/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		52: { id: 1, nickName: "user52", image: "https://picsum.photos/261/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		53: { id: 1, nickName: "user53", image: "https://picsum.photos/262/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		54: { id: 1, nickName: "user54", image: "https://picsum.photos/263/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		55: { id: 1, nickName: "user55", image: "https://picsum.photos/264/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		56: { id: 1, nickName: "user56", image: "https://picsum.photos/265/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		57: { id: 1, nickName: "user57", image: "https://picsum.photos/266/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		58: { id: 1, nickName: "user58", image: "https://picsum.photos/267/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		59: { id: 1, nickName: "user59", image: "https://picsum.photos/268/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		60: { id: 1, nickName: "user60", image: "https://picsum.photos/269/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		61: { id: 1, nickName: "user61", image: "https://picsum.photos/270/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		62: { id: 1, nickName: "user62", image: "https://picsum.photos/271/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		63: { id: 1, nickName: "user63", image: "https://picsum.photos/272/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		64: { id: 1, nickName: "user64", image: "https://picsum.photos/273/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		65: { id: 1, nickName: "user65", image: "https://picsum.photos/274/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		66: { id: 1, nickName: "user66", image: "https://picsum.photos/275/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		67: { id: 1, nickName: "user67", image: "https://picsum.photos/276/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		68: { id: 1, nickName: "user68", image: "https://picsum.photos/277/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		69: { id: 1, nickName: "user69", image: "https://picsum.photos/278/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		70: { id: 1, nickName: "user70", image: "https://picsum.photos/279/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		71: { id: 1, nickName: "user71", image: "https://picsum.photos/280/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		72: { id: 1, nickName: "user72", image: "https://picsum.photos/281/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		73: { id: 1, nickName: "user73", image: "https://picsum.photos/282/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		74: { id: 1, nickName: "user74", image: "https://picsum.photos/283/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		75: { id: 1, nickName: "user75", image: "https://picsum.photos/284/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		76: { id: 1, nickName: "user76", image: "https://picsum.photos/285/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		77: { id: 1, nickName: "user77", image: "https://picsum.photos/286/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		78: { id: 1, nickName: "user78", image: "https://picsum.photos/287/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		79: { id: 1, nickName: "user79", image: "https://picsum.photos/288/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		80: { id: 1, nickName: "user80", image: "https://picsum.photos/289/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		81: { id: 1, nickName: "user81", image: "https://picsum.photos/290/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		82: { id: 1, nickName: "user82", image: "https://picsum.photos/291/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		83: { id: 1, nickName: "user83", image: "https://picsum.photos/292/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		84: { id: 1, nickName: "user84", image: "https://picsum.photos/293/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		85: { id: 1, nickName: "user85", image: "https://picsum.photos/294/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		86: { id: 1, nickName: "user86", image: "https://picsum.photos/295/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		87: { id: 1, nickName: "user87", image: "https://picsum.photos/296/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		88: { id: 1, nickName: "user88", image: "https://picsum.photos/297/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		89: { id: 1, nickName: "user89", image: "https://picsum.photos/298/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		90: { id: 1, nickName: "user90", image: "https://picsum.photos/299/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		91: { id: 1, nickName: "user91", image: "https://picsum.photos/300/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		92: { id: 1, nickName: "user92", image: "https://picsum.photos/301/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		93: { id: 1, nickName: "user93", image: "https://picsum.photos/302/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		94: { id: 1, nickName: "user94", image: "https://picsum.photos/303/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		95: { id: 1, nickName: "user95", image: "https://picsum.photos/304/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		96: { id: 1, nickName: "user96", image: "https://picsum.photos/305/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		97: { id: 1, nickName: "user97", image: "https://picsum.photos/306/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		98: { id: 1, nickName: "user98", image: "https://picsum.photos/306/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
		99: { id: 1, nickName: "user99", image: "https://picsum.photos/306/300/?random", age: 23, si: 1, gu: 2, interests: [1,2,3,4,5], gender: 1 },
	}

	componentDidMount = () => {
		console.log("component DID MOUNT");
		const users = [];
		_.filter(this.users, (user, i) => 20*(this.props.nextPageNum-1) < i && i <=20*this.props.nextPageNum)
			.map( user =>
				users.push(user)
			)
		this.setState({users});
		this.props.setNextPageNum(this.props.nextPageNum+1);
	}


				/* TODO: TESTCODE */	timeout = null;
	loadMore = () => {
		this.setState({loadingContents: true});
		console.log("loadMore");

		// let params;
		// if(this.props.filtering)
		// 	params = {
		// 		token: this.props.token,
		// 		filter: true,
		// 		page: this.props.nextPageNum,
		// 		...this.props.filter
		// 	};
		// else
		// 	params = {
		// 		token: this.props.token,
		// 		filter: false,
		// 		page: this.props.nextPageNum
		// 	}
		// Axios.get("http://192.168.0.200:8080/users", { params })
		// 	.then(resp => {
		// 		this.props.updateMainUsers(this.props.users, resp.data.users);
		// 		this.props.setNextPageNum(this.props.nextPageNum+1);
		// 		this.props.setHasMorePages(resp.data.hasMorePages);
		// 		this.setState({loadingContents: false});
		// 	}).catch(err => {
		// 		console.log(err);
		// 		let errorTitle, errorMessage;
		// 		// if(!err.response || !err.response.data) {
		// 			errorTitle = "서버와 연결할 수 없습니다";
		// 			errorMessage = "잠시후 다시 시도해 주세요...";
		// 		// }
		// 		// else {
		// 		// 	errorTitle = err.response.data;
		// 		// }
		// 		this.setState({
					// loadingContents: false,
		// 			dialogOpen: true,
		// 			dialogIcon: 2,
		// 			dialogTitle: errorTitle,
		// 			dialogContent: errorMessage
		// 		});
		// 	})



		/* TODO:TESTCODE */		clearTimeout(this.timeout);
									this.timeout = setTimeout(() => {
										const users = [...this.state.users];
										_.filter(this.users, (user, i) => 20*(this.props.nextPageNum-1) < i && i <=20*this.props.nextPageNum)
											.map( user =>
												users.push(user)
											)
										this.setState({users, loadingContents: false});
										this.props.setNextPageNum(this.props.nextPageNum+1);
										users.length > 90 && this.props.setHasMorePages(false);
									}, 400);
	}
	handleScroll = () => {
		const { scrollHeight, scrollTop } = this.scrollContainer && this.scrollContainer;
		const visibleAreaHeight = this.props.contentStyles && parseInt(this.props.contentStyles.height);
		if(visibleAreaHeight + scrollTop + 150 >= scrollHeight)
			this.loadMore();
	}
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	}
	render() {
		const { hasMorePages, contentStyles } = this.props;
		// const { users } = this.props;
		const { users,
			loadingContents,
			dialogOpen,
			dialogIcon,
			dialogTitle,
			dialogContent} = this.state;

		return (
			<React.Fragment>
				<Filter path="users">닉네임</Filter>
				<div style={{height:"55px"}}></div>
				<div
					ref={scrollContainer => this.scrollContainer = scrollContainer}
					onScroll={ !loadingContents && hasMorePages ? this.handleScroll : null}
					style={contentStyles}>
					<Grid container
						direction="row"
						justify="flex-start"
						alignItems="center"
						spacing={0}>
						{
							// _.map(users, (user =>
							users.map(user =>
								<Grid item style={{width: "50%", minWidth: "390px"}}>
									<UserLarge key={user.id}
										id={user.id}
										nickName={user.nickName}
										image={user.image}
										age={user.age}
										si={user.si}
										gu={user.gu}
										interests={user.interests}
										gender={user.gender}/>
								</Grid>
							)
						}
						{
							hasMorePages &&
								<Grid item style={{position: "relative", height: "100px", left: "50%", transform: "translateX(-50%)"}}>
								{
									loadingContents &&
										<CircularProgress
										style={{
											position: "relative",
											top: "35px",
											color:"rgba(100, 180, 255)"
										}}
										size={30}
										thickness={5}/>
								}
									&nbsp;
								</Grid>
						}
					</Grid>
				</div>
				<Dialog
					open={dialogOpen}
					onClose={this.handleDialogClose}
					title={dialogTitle}
					content={dialogContent}
					icon={dialogIcon}
				/>
			</React.Fragment>
		)
	}
}

const mapStateToProps = state => ({
	token: state.token,
	users: state.mainUsers,
	filter: state.filter,
	filtering: state.filtering,
	nextPageNum: state.nextPageNum,
	hasMorePages: state.hasMorePages,
})
const mapDispatchToProps = {
	updateMainUsers,
	setHasMorePages,
	setNextPageNum
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
