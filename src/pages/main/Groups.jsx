import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import _ from 'lodash';
import Axios from 'axios';
import { Grid, CircularProgress } from '@material-ui/core';

import { updateMainGroups,
	setHasMorePages,
	setNextPageNum } from 'actions';
import { Dialog, CreateGroupButton } from 'components';
import { Filter, GroupLarge } from 'containers';

export class Groups extends Component {
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
		Axios.get("http://192.168.0.200:8080/groups", { params })
			.then(resp => {
				this.props.updateMainGroups(this.props.groups, resp.data.groups);
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
	}
	handleScroll = () => {
		const { scrollHeight, scrollTop } = this.scrollContainer && this.scrollContainer;
		const visibleAreaHeight = this.props.contentStyles && parseInt(this.props.contentStyles.height);
		if(visibleAreaHeight + scrollTop + 150 >= scrollHeight)
			this.loadMore();
	}
	handleCreateGroup = () => {

	}
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	}
	render() {
		const { hasMorePages, contentStyles, groups } = this.props; //TODO: 테스트후 주석풀것
		const {	loadingContents,
			dialogOpen,
			dialogIcon,
			dialogTitle,
			dialogContent } = this.state;

		return (
			<Fragment>
				<Filter path="groups">그룹명</Filter>
				<div style={{height:"55px", textAlign:"end"}}>
					<CreateGroupButton
						onClick={this.handleCreateGroup}/>
				</div>
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
							groups && _.map(groups, group =>
								<Grid item style={{width: "50%", minWidth: "390px"}}>
									<GroupLarge key={group.id}
										id={group.id}
										groupName={group.groupName}
										master={group.master}
										image={group.image}
										age={group.age}
										si={group.si}
										gu={group.gu}
										interests={group.interests}
										estDate={group.estDate}
										memberCnt={group.memberCnt}
										maxMember={group.maxMember}
										gender={group.gender}
										intro={group.intro}/>
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
			</Fragment>
		)
  	}
}

const mapStateToProps = state => ({
	token: state.token,
	groups: state.mainGroups,
	filter: state.filter,
	filtering: state.filtering,
	nextPageNum: state.nextPageNum,
	hasMorePages: state.hasMorePages,
})
const mapDispatchToProps = {
	updateMainGroups,
	setHasMorePages,
	setNextPageNum
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Groups));