import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Axios from 'axios';
import { Grid, Fade } from '@material-ui/core';

import { UserMini } from 'containers';
import Pagination from 'components/Pagination';
import { updateMeFriends, clearMeFriends } from 'actions';

class MeFriends extends Component {
	state = {
		currentPage: 1,
		friendsPages: 0,
		st: 0,
		ed: 0,
	}
	componentDidMount() {
		this.updatePageNums();
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.meFriends !== nextProps.meFriends)
			this.updatePageNums();
	}
	updatePageNums = () => {
		const friendsPages = this.props.friendsPages;
			this.setState(state => ({friendsPages,
				st: friendsPages-state.currentPage < 3 ? friendsPages-4 < 1 ? 1 : friendsPages-4 : state.currentPage-2 < 1 ? 1 : state.currentPage-2,
				ed: state.currentPage < 3 ? friendsPages > 5 ? 5 : friendsPages : state.currentPage+2 > friendsPages ? friendsPages : state.currentPage+2,
		}));
	}
	handlePagination = target => {
		let currentPage;
		switch(target){
			case "<":
				currentPage = this.state.st-1 <= 0 ? 1 : this.state.st-1;
				// currentPage = this.state.currentPage-5 <= 0 ? 1 : this.state.currentPage-5;
				break;
			case ">":
				currentPage = this.state.ed+1 >= this.state.friendsPages ? this.state.friendsPages : this.state.ed+1;
				// currentPage = this.state.currentPage+5 >= this.state.friendsPages ? this.state.friendsPages : this.state.currentPage+5;
				break;
			default:
				currentPage= target;
		}
		this.setState(state => ({
			currentPage,
			st: state.friendsPages-currentPage < 3 ? state.friendsPages-4 < 1 ? 1 : state.friendsPages-4 : currentPage-2 < 1 ? 1 : currentPage-2,
			ed: currentPage < 3 ? state.friendsPages > 5 ? 5 : state.friendsPages : currentPage+2 > state.friendsPages ? state.friendsPages : currentPage+2,
		}));

		this.props.clearMeFriends();

		const id = this.props.match.params.id;
		let params = {
			token: this.props.token,
			memberlist: true,
			page: currentPage
		}

		if(parseInt(id)!==this.props.token)
			params.id = id;

		// Axios.get('http://192.168.0.23:8080/me', {
		// 		params
		// 	}).then(resp => {
		// 		console.log(resp);	// FIXME: 지워주세용
		// 		this.props.updateMeFriends(resp.data.friends);
		// 	}).catch(err => {
		// 		console.log(err.response);	// FIXME: REMOVE
		// 		let errorTitle, errorMessage;
		// 		if(!err.response || !err.response.data) {
		// 			errorTitle = "서버와 연결할 수 없습니다";
		// 			errorMessage = "잠시후 다시 시도해 주세요...";
		// 		}
		// 		else {
		// 			errorTitle = err.response.data;
		// 		}
		// 		this.props.handleOpenDialog({
		// 			dialogOpen: true,
		// 			dialogIcon: 2,
		// 			dialogTitle: errorTitle,
		// 			dialogContent: errorMessage
		// 		});
		// 	}); // FIXME: REMOVE LOG

		setTimeout(() => {
			this.props.updateMeFriends({
				1123: {id:1123, nickName: `피자나라키친공주${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
				1124: {id:1124, nickName: `조피자냠냠${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
				1125: {id:1125, nickName: `도민호${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
				1126: {id:1126, nickName: `미피앤무스티${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
				1127: {id:1127, nickName: `헬로월드${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
				1128: {id:1128, nickName: `헬헬헬${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
				1129: {id:1129, nickName: `이맛피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
				1130: {id:1130, nickName: `코스트코피자${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: false},
				1131: {id:1131, nickName: `소고기고고${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true},
				1132: {id:1132, nickName: `이름뭐짓지${Math.ceil(Math.random()*100)}`, gender: `${Math.ceil(Math.random()*2)}`, image: `https://picsum.photos/200/${Math.ceil(Math.random()*100)+200}/?random`, online: true}
			});
		}, 200);

	}
	render() {
		const { currentPage, st, ed, friendsPages } = this.state;
		const { meFriends }  = this.props;
		const pages = [];
		if(friendsPages > 5)
			pages.push({text: "<", onClick: ()=>{this.handlePagination("<")}})
		for(let i=st; i<=ed; i++){
			pages.push({active: currentPage===i, text: i, onClick: ()=>{this.handlePagination(i)}})
		}
		if(friendsPages > 5)
			pages.push({text: ">", onClick: ()=>{this.handlePagination(">")}})

		return (
			<Fade in={true} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={8}>
					{
						_.map(meFriends, x =>
							<Grid item key={x.nickName}>
								<UserMini
									id={x.id}
									nickName={x.nickName}
									gender={x.gender}
									image={x.image}
									online={x.online}/>
							</Grid>
						)}
					<Grid item>
					{
						friendsPages > 1 &&
						<Pagination
							pages={pages}
							currentPage={currentPage}
							onClick={this.handlePagination}
							color="info"
							/>
					}
					</Grid>
				</Grid>
			</Fade>
		)
	}
}

const mapStateToProps = state => ({
	meFriends: state.meFriends,
	friendsPages: state.me && state.me.friendsPages,
	token: state.token
})
const mapDispatchToProps = {
	updateMeFriends,
	clearMeFriends
}

export default connect(mapStateToProps, mapDispatchToProps)(MeFriends);



