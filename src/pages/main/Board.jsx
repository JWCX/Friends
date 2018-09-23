		// <div style={{
		// 	position: "relative",
		// 	height: "100%",
		// 	width: "100%",
		// 	background: "url('https://farm4.staticflickr.com/3931/15532327436_991de2a31e_z.jpg')",
		// 	borderRadius: "10px",
		// 	backgroundSize: "cover",
		// 	backgroundPosition: "right",
		// 	display: "table"
		// 	}}>
		// 	<div style={{
		// 		verticalAlign: "middle",
		// 		textAlign: "center",
		// 		display:"table-cell",
		// 		color: "white",
		// 		fontSize: "10em",
		// 		background: "rgba(0,0,0,0.4)",
		// 		}}>
		// 		공사중 ...
		// 	</div>
		// </div>

import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import Axios from 'axios';
import moment from 'moment';
import { Grid, CircularProgress } from '@material-ui/core';

import { setHasMorePages,
	setNextPageNum } from 'actions';
import { Dialog,
	ExpansionPost,
	PostHeader,
	PostContent } from 'components';
import { NanoExpandIcon } from 'components/AppBarIcons';
export class Board extends Component {
	state = {
		loadingContents: false,
		posts: [],

		dialogOpen: false,
		dialogIcon: null,
		dialogTitle: "",
		dialogContent: ""
	}

	expandRequest = id => {
		this.setState(state => ({[`expanded${id}`]: !state[`expanded${id}`]}));
		console.log(this.state);
	}
	// handleScroll = () => {
	// 	const { scrollHeight, scrollTop } = this.scrollContainer && this.scrollContainer;
	// 	const visibleAreaHeight = this.props.contentStyles && parseInt(this.props.contentStyles.height);
	// 	if(visibleAreaHeight + scrollTop + 150 >= scrollHeight)
	// 		this.loadMore();
	// }
	handleDialogClose = () => {
		this.setState({ dialogOpen: false,
			dialogIcon: 0,
			dialogTitle:"",
			dialogContent:"" });
	}
	render() {
		const { hasMorePages, contentStyles } = this.props;
		const { posts,
			loadingContents,
			dialogOpen,
			dialogIcon,
			dialogTitle,
			dialogContent} = this.state;
		return (
			<React.Fragment>
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
							_.map(
								{
									1:{id:1, title: "포스트 테스트 123 abc hell wo ld", content: "hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠 hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠포스트 테스트 123 abc hell wo ld", content: "hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠 hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠포스트 테스트 123 abc hell wo ld", content: "hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠 hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello wor포스트 테스트 123 abc hell wo ld", content: "hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠 hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠ld 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠hello world 안녕하세요 게시판 테스트 중 헬로 월드 내공냠냠",
									 writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									2:{id:2, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									3:{id:3, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									4:{id:4, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									5:{id:5, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									6:{id:6, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									7:{id:7, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									8:{id:8, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									9:{id:9, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									10:{id:10, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									11:{id:11, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									12:{id:12, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									13:{id:13, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									14:{id:14, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									15:{id:15, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									16:{id:16, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									17:{id:17, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									18:{id:18, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									19:{id:19, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									20:{id:20, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									21:{id:21, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									22:{id:22, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									23:{id:23, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									24:{id:24, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									25:{id:25, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									26:{id:26, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									27:{id:27, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									28:{id:28, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									29:{id:29, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									30:{id:30, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									31:{id:31, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									32:{id:32, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									33:{id:33, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									34:{id:34, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									35:{id:35, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									36:{id:36, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									37:{id:37, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									38:{id:38, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									39:{id:39, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									40:{id:40, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									41:{id:41, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									42:{id:42, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									43:{id:43, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									44:{id:44, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									45:{id:45, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									46:{id:46, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									47:{id:47, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									48:{id:48, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									49:{id:49, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									50:{id:50, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									51:{id:51, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									52:{id:52, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									53:{id:53, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									54:{id:54, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									55:{id:55, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									56:{id:56, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									57:{id:57, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									58:{id:58, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									59:{id:59, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									60:{id:60, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									61:{id:61, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									62:{id:62, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									63:{id:63, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									64:{id:64, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
									65:{id:65, title: "포스트 테스트 123 abc hell wo ld", content: "내공냠냠", writedate: new Date(), user:{id: 1, nickName:"주먹감자먹어라", image:"https://picsum.photos/200/200"}, views: 204, comments:{2: {id:2, user:{id: 22, nickName:"김댓글", image:"https://picsum.photos/200/200"}, content:"잘보고갑니다"}, 202: {id:202, user:{id: 23, nickName:"댓글충", image:"https://picsum.photos/200/200"}, content:"내공냠냠"}}, likes: 5},
							}, post =>
								<Grid item style={{width: "100%", minWidth: "390px"}}>
									<ExpansionPost
										id={post.id}
										onClick={this.expandRequest}
										expanded={this.state[`expanded${post.id}`]}
										icon={<NanoExpandIcon fill="rgb(150,150,150)"/>}
										summary={
											<PostHeader
												expanded={this.state[`expanded${post.id}`]}
												title={post.title}
												writedate={moment(post.writedate).fromNow()}
												user={post.user}
												views={post.views}
												comments={_.values(post.comments).length}
												likes={post.likes}
												/>
										}>
										<PostContent>{post.content}</PostContent>
									</ExpansionPost>
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

			// <div style={{
			// 	position: "relative",
			// 	height: "100%",
			// 	width: "100%",
			// 	background: "url('https://d3cbihxaqsuq0s.cloudfront.net/images/37060215_xl.jpg')",
			// 	borderRadius: "10px",
			// 	backgroundSize: "cover",
			// 	backgroundPosition: "right",
			// 	textAlign: "center",
			// 	display: "table"
			// 	}}>
			// 	<div style={{
			// 		verticalAlign: "middle",
			// 		display:"table-cell",
			// 		color: "white",
			// 		fontSize: "10em",
			// 		background: "rgba(0,0,0,0.4)",
			// 		}}>
			// 		공사중 ...
			// 	</div>
			// </div>
		)
	}
}



const mapStateToProps = state => ({
	token: state.token,
	nextPageNum: state.nextPageNum,
	hasMorePages: state.hasMorePages,
})
const mapDispatchToProps = {
	setHasMorePages,
	setNextPageNum
}
export default connect(mapStateToProps, mapDispatchToProps)(Board);
