import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Grid, Fade } from '@material-ui/core';

import { UserMini } from 'containers';
import Pagination from 'components/Pagination';

class MeFriends extends Component {
	state = {
		maxPages: 0,
		currentPage: 1,
		st: 0,
		ed: 0,

		friends: [{id:"123", nickName: "피제리움", gender: "1", image: "https://picsum.photos/800/800/?random", online: true},
		{id:"123", nickName: "조피자", gender: "1", image: "https://picsum.photos/800/801/?random", online: true},
		{id:"123", nickName: "도미노피자", gender: "2", image: "https://picsum.photos/802/800/?random", online: false},
		{id:"123", nickName: "미스터 피자", gender: "1", image: "https://picsum.photos/801/800/?random", online: false},
		{id:"123", nickName: "피자헛", gender: "1", image: "https://picsum.photos/800/803/?random", online: false},
		{id:"123", nickName: "알볼로피자", gender: "2", image: "https://picsum.photos/802/800/?random", online: true},
		{id:"123", nickName: "피자에땅", gender: "0", image: "https://picsum.photos/804/800/?random", online: false},
		{id:"123", nickName: "피제리아디부자", gender: "1", image: "https://picsum.photos/805/800/?random", online: false},
		{id:"123", nickName: "피자스쿨", gender: "2", image: "https://picsum.photos/800/804/?random", online: true},
		{id:"123", nickName: "피자마루", gender: "2", image: "https://picsum.photos/800/805/?random", online: true}],

	}
	componentDidMount() {
		// FIXME: DELETE THIS TEST CODE
		for(let i=11; i<100; i++)
			this.state.friends.push({id:`${200+i}`, nickName: `조피자${i}`, gender: "1", image: `https://picsum.photos/${40+i}/${40+i}image?${i}`, online: true});
		// FIXME: DELETE THIS TEST CODE


		const maxPages = Math.ceil(this.state.friends.length/10); // TODO: maxPages는 서버에서 읽어온다
		this.setState(state => ({maxPages,
			st: maxPages-state.currentPage < 3 ? maxPages-4 < 1 ? 1 : maxPages-4 : state.currentPage-2 < 1 ? 1 : state.currentPage-2,
			ed: state.currentPage < 3 ? maxPages > 5 ? 5 : maxPages : state.currentPage+2 > maxPages ? maxPages : state.currentPage+2,
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
				currentPage = this.state.ed+1 >= this.state.maxPages ? this.state.maxPages : this.state.ed+1;
				// currentPage = this.state.currentPage+5 >= this.state.maxPages ? this.state.maxPages : this.state.currentPage+5;
				break;
			default:
				currentPage= target;
		}
		this.setState(state => ({
			currentPage,
			st: state.maxPages-currentPage < 3 ? state.maxPages-4 < 1 ? 1 : state.maxPages-4 : currentPage-2 < 1 ? 1 : currentPage-2,
			ed: currentPage < 3 ? state.maxPages > 5 ? 5 : state.maxPages : currentPage+2 > state.maxPages ? state.maxPages : currentPage+2,
		}));
	}
	render() {
		const { friends, maxPages, currentPage, st, ed } = this.state;
		const pages = [];
		// const maxPages = 40;

		if(maxPages > 5)
			pages.push({text: "<", onClick: ()=>{this.handlePagination("<")}})
		for(let i=st; i<=ed; i++){
			pages.push({active: currentPage===i, text: i, onClick: ()=>{this.handlePagination(i)}})
		}
		if(maxPages > 5)
			pages.push({text: ">", onClick: ()=>{this.handlePagination(">")}})

		console.log("pages : ", pages);
		console.log("friendsLeng: ", friends.length);
		console.log("maxPages : ", maxPages);
		console.log("currentPage : ", currentPage);
		return (
			<Fade in={true} timeout={{enter: 500, exit: 500}}>
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={8}>
					{
						friends.filter((x, index) => {
							for(let i=1; i<=10;i++)
								if(index===currentPage*10-i)
									return true;
						}).map(x =>
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
						friends.length > 10 &&
						<Pagination
							pages={pages}
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
})
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(MeFriends);



