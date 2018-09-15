import React, { Component } from 'react';
import { FormControlLabel,
	Checkbox
} from '@material-ui/core';
import LockOpen from '@material-ui/icons/LockOpen';
import Lock from '@material-ui/icons/LockRounded';

class ExpCheckbox extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.checked !== nextProps.checked ||
			this.props.disabled !== nextProps.disabled){
			return true;
		}
		return false;
	}
	render() {
		const { id, value, checked, onChange, label, disabled } = this.props;
		return (
			<FormControlLabel
				control={
					<Checkbox
						id={id}
						style={{width:"30px", height:"30px", padding: "18px"}}
						icon={<LockOpen/>}
						checkedIcon={<Lock/>}
						onChange={onChange}
						color="primary"
						value={value}
						disabled={disabled}
						checked={ checked === true ? true : false }
						/>
				}
				labelPlacement="end"
				label={label}/>
		)
	}
}

export default ExpCheckbox;