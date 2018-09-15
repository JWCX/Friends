import React, { Component } from 'react';
import { FormControl,
		InputLabel,
		Input,
		MenuItem,
		FormHelperText,
		Select
	} from '@material-ui/core';

class MySelect extends Component {
	shouldComponentUpdate(nextProps) {
		if(this.props.value !== nextProps.value ||
			this.props.children !== nextProps.children)
			return true;
		else return false;
	}
	render() {
		const { name, value, children, label, label2,
				shrink, displayEmpty, emptyLabel, disabled,
				width, margin, handleChange, MenuProps } = this.props;
		return (
			<FormControl style={{margin: margin}}>
				{ label ? <InputLabel shrink={displayEmpty || shrink} htmlFor={`${name}-select`} style={{marginLeft: "3px"}}>{label}</InputLabel> : "" }
				<Select
					name={name}
					value={value || ""}
					onChange={handleChange}
					displayEmpty={displayEmpty}
					input={<Input id={`${name}-select`}/>}
					style={{paddingLeft: "5px", width: width}}
					MenuProps={MenuProps}
					disabled={disabled}>
					{
						displayEmpty && <MenuItem value="">
							<span style={{opacity: 0.6}}>{emptyLabel}</span>
						</MenuItem>
					}
					{children}
				</Select>
				 { label2 ? <FormHelperText>{label2}</FormHelperText> : "" }
			</FormControl>
		)
	}
}

export default MySelect;