import React from 'react';
import Datetime from "react-datetime";
import moment from 'moment';
import { InputLabel, FormControl }from "@material-ui/core";

class DateTimePicker extends React.Component{
	state = {
		focus: false,
	}
	shouldComponentUpdate(nextProps, nextState) {
		if(this.props.value !== nextProps.value ||
			this.state.focus !== nextState.focus ||
			this.state.disabled !== nextState.disabled)
			return true;
		else return false;
	}
	// renderYear = ( props, year, selectedDate ) => {
    //     return <td {...props}>{year}<span style={{fontSize:"0.8em"}}>년</span></td>;
    // }
	// renderMonth = ( props, month, year, selectedDate ) => {
    //     return <td {...props}>{month + 1}<span style={{fontSize:"0.8em"}}>월</span></td>;
	// }
	valid = (current) => {
		if(this.props.birth)
			return current.isBefore(moment().subtract(8, 'years'));  // 생년월일 설정은 현재로부터 10년전 날짜만 선택가능
		else
			return current.isAfter(moment().subtract(1, 'days'));	// 그외의 경우는 오늘 이후의 날짜만 선택 가능
	};
	render(){
		const { id, value, label, viewMode, birth, shrink, onChange, placeholder, disabled } = this.props;
		const labelStyle = {position:"relative", paddingLeft:"5px"};
		labelStyle.color = this.state.focus && "#0275aa";
		return (
		<div>
			<FormControl style={{width: "260px"}}>
				<InputLabel
					shrink={this.state.focus || shrink} htmlFor={id} style={labelStyle}>
					{label}
				</InputLabel>
				<Datetime
					id={id}
					value={value}
					dateFormat="YYYY. M. D"
					timeFormat={birth ? false : true}
					viewMode={viewMode}	// 초기화면(years, months, days, time)
					onChange={onChange}
					onFocus={()=>{this.setState({focus:true})}}
					onBlur={()=>{this.setState({focus:false})}}
					// renderMonth={this.renderMonth}
					// renderYear={this.renderYear}
					isValidDate={this.valid}
					inputProps={{disabled: disabled, placeholder, style:{fontFamily: "Godo", fontSize:"1em", paddingLeft:"5px"}}}
					// locale="en"
				/>
			</FormControl>
		</div>
    );
  }
}

export default DateTimePicker;