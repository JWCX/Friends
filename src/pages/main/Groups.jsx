import React, { Component, Fragment } from 'react';
import _ from 'lodash';
import { Grid } from '@material-ui/core';
import { Filter, GroupLarge } from 'containers';

export class Groups extends Component {
	render() {
		// const { groups } = this.props; //TODO: 테스트후 주석풀것
		const groups = {
			1: {
				id: 1,
				groupName: "토요 조기 축구",
				master: {
					id: 5,
					nickName: "김마스터"
				},
				interests: [1,2,5],
				estDate: new Date(),
				memberCnt: 250,
				maxMember: 300,
				image: "https://picsum.photos/200/300/?random",
				intro: "경기도! 성남! 토요일! 오후 5시! 축구후 맥주한잔 어때?"
			},
			2: {
				id: 2,
				groupName: "이태원 맛집 탐방",
				master: {
					id: 2,
					nickName: "대마짱"
				},
				interests: [1,3,5],
				estDate: new Date(),
				memberCnt: 195,
				maxMember: 300,
				image: "https://picsum.photos/201/300/?random",
				intro: "이태원 맛집 다 돌아보자"
			},
			3: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/200/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			4: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/201/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			5: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/202/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			6: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/203/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			7: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/204/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			8: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/205/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			9: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/206/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			10: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/207/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			11: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/208/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			12: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/209/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			13: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/210/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			14: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/211/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			15: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/212/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			16: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/213/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			17: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/214/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			18: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/215/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			19: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/216/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			20: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/217/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			21: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/218/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			22: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/219/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			23: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/220/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			24: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/221/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			25: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/222/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			26: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/223/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			27: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/224/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			28: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/225/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			29: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/226/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			30: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/227/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			31: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/228/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			32: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/229/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			33: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/230/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			34: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/231/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			35: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/232/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			36: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/233/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			37: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/234/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			38: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/235/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			39: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/236/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			40: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/237/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			41: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/238/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			42: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/239/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			43: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/240/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			44: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/241/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			45: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/242/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			46: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/243/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			47: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/244/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			48: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/245/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			49: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/246/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
			50: { id: 3, groupName: "기타등등", master: { id: 1, nickName: "박보갬" }, interests: [3,5,6], estDate: new Date(), memberCnt: 10, maxMember: 200, image: "https://picsum.photos/247/301/?random", intro: "기타를 막 배우기 시작하셨다고요? 같이 배워봐요 ^^" },
		}
		return (
			<Fragment>
				<Filter path="groups">그룹명</Filter>
				<div style={{height:"55px"}}></div>
				<Grid container
					direction="row"
					justify="flex-start"
					alignItems="center"
					spacing={8}>
					{
						groups && _.map(groups, group =>
							<Grid item style={{width: "50%", minWidth: "390px"}}>
								<GroupLarge key={group.id}
									id={group.id}
									groupName={group.groupName}
									image={group.image}
									age={group.age}
									si={group.si}
									gu={group.gu}
									interests={group.interests}
									gender={group.gender}/>
							</Grid>
						)
					}
				</Grid>
			</Fragment>
		)
  	}
}

export default Groups;