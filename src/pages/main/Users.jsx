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

		dialogOpen: false,
		dialogIcon: null,
		dialogTitle: "",
		dialogContent: ""
	}

	componentDidMount = () => {
		console.log("component DID MOUNT");
		this.props.setNextPageNum(this.props.nextPageNum+1);
	}

				// /* TODO: TESTCODE */	timeout = null;
	loadMore = () => {
		this.setState({loadingContents: true});
		console.log("loadMore");

		let params;
		if(this.props.filtering)
			params = {
				token: this.props.token,
				filter: true,
				page: this.props.nextPageNum,
				...this.props.filter
			};
		else
			params = {
				token: this.props.token,
				filter: false,
				page: this.props.nextPageNum
			}
		Axios.get(`${process.env.REACT_APP_DEV_API_URL}/users`, { params })
			.then(resp => {
				console.log(resp.data);
				this.props.updateMainUsers(this.props.users, resp.data.users);
				this.props.setNextPageNum(this.props.nextPageNum+1);
				this.props.setHasMorePages(resp.data.hasMorePages);
				this.setState({loadingContents: false});
			}).catch(err => {
				console.log(err);
				let errorTitle, errorMessage;
				// if(!err.response || !err.response.data) {
					errorTitle = "서버와 연결할 수 없습니다";
					errorMessage = "잠시후 다시 시도해 주세요...";
				// }
				// else {
				// 	errorTitle = err.response.data;
				// }
				this.setState({
					loadingContents: false,
					dialogOpen: true,
					dialogIcon: 2,
					dialogTitle: errorTitle,
					dialogContent: errorMessage
				});
			})



		// /* TODO:TESTCODE */		clearTimeout(this.timeout);
		// 							this.timeout = setTimeout(() => {
		// 								const users = [...this.state.users];
		// 								_.filter(this.users, (user, i) => 20*(this.props.nextPageNum-1) < i && i <=20*this.props.nextPageNum)
		// 									.map( user =>
		// 										users.push(user)
		// 									)
		// 								this.setState({users, loadingContents: false});
		// 								this.props.setNextPageNum(this.props.nextPageNum+1);
		// 								users.length > 90 && this.props.setHasMorePages(false);
		// 							}, 400);
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
		const { users } = this.props;
		const { loadingContents,
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
							users && _.map(users, user =>
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
