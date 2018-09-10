import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { MenuItem, Grid } from '@material-ui/core';

import { TextField,
		Select,
		RadioGroup,
		DateTimePicker,
	} from 'components';

export class MeInfo extends Component {
	state = {
		// id: null,
		pw: null,
		pw2: null,
		// nickName: null,
		// si: null,
		// gu: null,
		// birth: null,
		// age: null,
		// gender: null,
		// intro: null,
		// msg: null,
		// images: [],
		// interests: [],
		// expLocation: null,
		// expBirth: null,
		// expAge: null,
		// expGender: null,
		// expFriends: null,
		// expGroups: null,
	}
	componentDidMount() {
		this.setState({...this.props.myInfo});
	}
	handleChange = (e) => {
		const target = e.target;
		if(target.id){
			return this.setState({[target.id]: target.value});
		}
		else {
			switch(target.name){
				case "si":
					return this.setState({si: target.value, gu: ""});
				default:
					return this.setState({[target.name]: target.value});
			}
		}
	}
	handleBirthChange = (moment) => {
		this.setState({birth: moment});
	}
	render() {
		console.log(this.state);
		const { id,
			pw,
			pw2,
			nickName,
			si,
			gu,
			birth,
			age,
			gender,
			intro,
			msg,
			images,
			interests,
			expLocation,
			expBirth,
			expAge,
			expGender,
			expFriends,
			expGroups, } = this.state;
		const { dataInterest, dataSi, dataGu } = this.props;
		console.log(birth);
		return (
			<form noValidate autoComplete="off">
				<Grid container
					direction="column"
					justify="center"
					alignItems="center"
					spacing={16}>
					<Grid item>
						<TextField
							id="id"
							value={id}
							label="아이디"
							disabled
							shrink
							width="260px"
							margin="dense"/>
					</Grid>
					<Grid item>
						<TextField
							id="pw"
							value={pw}
							type="password"
							onChange={this.handleChange}
							label="비밀번호"
							shrink
							// error={pwError}
							// errorMessage={pwErrorMessage}
							// process={pwProcess}
							// ok={pwOk}
							autoComplete="current-password"
							margin="dense"
							width="260px"/>
					</Grid>
					<Grid item>
						<TextField
							id="pw2"
							value={pw2}
							type="password"
							onChange={this.handleChange}
							label="비밀번호 재입력"
							shrink
							// error={pwError}
							// errorMessage={pwErrorMessage}
							// process={pwProcess}
							// ok={pwOk}
							autoComplete="current-password"
							margin="dense"
							width="260px"/>
					</Grid>
					<Grid item>
						<TextField
							id="nickName"
							value={nickName}
							onChange={this.handleChange}
							label="닉네임"
							shrink
							width="260px"
							margin="dense"/>
					</Grid>
					<Grid item>
						<DateTimePicker
							id="birth"
							label="생년월일"
							value={birth}
							viewMode="years"
							birth
							shrink
							onChange={this.handleBirthChange}
							/>
					</Grid>
					<Grid item>
						<Select
							name="si"
							value={si}
							label="지역(시)"
							width="260px"
							shrink
							handleChange={this.handleChange}>
							{_.map(dataSi, si => <MenuItem value={si.code} key={si.code}>{si.name}</MenuItem>)}
						</Select>
					</Grid>
					<Grid item>
						<Select
							name="gu"
							value={gu}
							label="지역(구)"
							width="260px"
							shrink
							handleChange={this.handleChange}>
							{_.map(dataGu[si], gu => <MenuItem value={gu.guCode} key={gu.guCode}>{gu.name}</MenuItem>)}
						</Select>
					</Grid>
					<Grid item>
						<RadioGroup
							name="gender"
							value={gender}
							label="성별"
							row
							handleChange={this.handleChange}
							data={[{label: "남성", value: "1"}, {label: "여성", value: "2"}]}/>
					</Grid>
					<Grid item>
						<TextField
							id="intro"
							value={intro}
							onChange={this.handleChange}
							label="자기소개"
							shrink
							multiline
							rows={3}
							rowsMax={5}
							// error={pwError}
							// errorMessage={pwErrorMessage}
							// process={pwProcess}
							// ok={pwOk}
							autoComplete="current-password"
							margin="dense"
							width="500px"/>
					</Grid>
					<Grid item>
						<TextField
							id="msg"
							value={msg}
							onChange={this.handleChange}
							label="친구요청을 받았을 때 상대에게 보여줄 메세지"
							shrink
							multiline
							rows={3}
							rowsMax={5}
							// error={pwError}
							// errorMessage={pwErrorMessage}
							// process={pwProcess}
							// ok={pwOk}
							autoComplete="current-password"
							margin="dense"
							width="500px"/>
					</Grid>
				</Grid>
				<p>
					{id},
					{pw},
					{pw2},
					{nickName},
					{si},
					{gu},
					{/* {birth ? birth._d : null}, */}
					{age},
					{gender},
					{intro},
					{msg},
				</p>
			</form>
		)
	}
}

const mapStateToProps = state => ({
	dataInterest: state.dataInterest,
	dataSi: state.dataSi,
	dataGu: state.dataGu,
	myInfo: state.myInfo,
})
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(MeInfo);