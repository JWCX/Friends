import React, { Component } from 'react';
import { FormControl,
		FormGroup,
		FormLabel,
} from '@material-ui/core';

import { ExpCheckbox } from 'components';

class ExpSelectForm extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.birthyn !== nextProps.birthyn ||
			this.props.areayn !== nextProps.areayn ||
			this.props.genderyn !== nextProps.genderyn ||
			this.props.friendsyn !== nextProps.friendsyn ||
			this.props.groupsyn !== nextProps.groupsyn ||
			this.props.disabled !== nextProps.disabled)
			return true;
		return false;
	}
	render() {
		const {
			areayn,
			birthyn,
			genderyn,
			friendsyn,
			groupsyn,
			onChange,
			disabled } = this.props;
		return (
			<FormControl component="fieldset" style={{boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px", width: "270px", padding:"0 15px", margin: "0 0 5px 0"}}>
				<FormLabel style={{background:"white", fontSize: "0.8em", padding: "5px 0 0 0"}} component="legend">공개여부 설정</FormLabel>
				<FormGroup>
					<ExpCheckbox
						id="birthyn"
						checked={ birthyn }
						label="생년월일(나이)"
						onChange={onChange}
						disabled={disabled}
						/>
					<ExpCheckbox
						id="areayn"
						checked={areayn}
						label="지역"
						onChange={onChange}
						disabled={disabled}
						/>
					<ExpCheckbox
						id="genderyn"
						checked={genderyn}
						label="성별"
						onChange={onChange}
						disabled={disabled}
						/>
					<ExpCheckbox
						id="friendsyn"
						checked={friendsyn}
						label="친구 리스트"
						onChange={onChange}
						disabled={disabled}
						/>
					<ExpCheckbox
						id="groupsyn"
						checked={groupsyn}
						label="가입한 그룹 리스트"
						onChange={onChange}
						disabled={disabled}
						/>
				</FormGroup>
			</FormControl>
		)
	}
}

export default ExpSelectForm;