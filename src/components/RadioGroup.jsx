import React, { Component } from 'react';
import { Radio,
		RadioGroup,
		FormHelperText,
		FormControlLabel,
		FormControl,
		FormLabel,
	} from '@material-ui/core';

class MyRadioGroup extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.value !== nextProps.value ||
			this.props.disabled !== nextProps.disabled)
			return true;
		else return false;
	}
	render() {
		const { name, value, data, label, label2, labelPlacement, disabled, row, handleChange } = this.props;
		return (
			<div style={{paddingTop:"3px"}}>
				<FormControl component="fieldset">
					{ label ? <FormLabel component="legend" style={{fontSize: "0.8em", marginLeft:"5px"}}>{label}</FormLabel> : "" }
					<RadioGroup
						aria-label={name}
						name={name}
						value={value}
						onChange={handleChange}
						row={row}
						>
						{
							data.map( (x, index) =>
								<FormControlLabel key={index}
									value={x.value}
									control={<Radio color="primary" style={{width:"35px", height:"30px"}}/>}
									label={x.label}
									labelPlacement={labelPlacement}
									style={{margin:"5px 10px 0px 0px"}}
									disabled={disabled}
								/>
							)
						}
					</RadioGroup>
					{ label2 ? <FormHelperText>{label2}</FormHelperText> : "" }
				</FormControl>
			</div>
		)
	}
}

export default MyRadioGroup;