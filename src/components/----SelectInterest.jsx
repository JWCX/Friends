import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormControl,
		Select,
		InputLabel,
		FormHelperText,
		MenuItem,
		Input,
		Collapse,
	} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { InterestChip } from 'components/Chips';
import _ from 'lodash';

const styles = theme => ({
	root: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
	formControl: {
	  margin: theme.spacing.unit,
	  minWidth: 260,
	  maxWidth: 260,
	},
	chips: {
	  display: 'flex',
	  flexWrap: 'wrap',
	},
  });

const MenuProps = {
PaperProps: {
	style: {
	maxHeight: "600px",
	maxWidth: "240px",
	margin: "0 260px",
	},
},
};

class SelectInterest extends Component {

	state = {
		name: [],
		error: false,
	};

	handleChange = ({target}) => {
		if(this.state.name.length>=5 && target.value.length >=5)
			return this.setState({error: true});
		this.setState({error: false, name: target.value});
	};

	render() {
		const { dataInterest, classes } = this.props;
		const { error } = this.state;
		console.log(this.state);
		return (
			<FormControl className={classes.formControl} error={error}>
				<InputLabel style={{marginLeft: "3px"}} shrink htmlFor="select-multiple-chip">
					관심사
				</InputLabel>
				<Select
					multiple
					value={this.state.name}
					onChange={this.handleChange}
					onBlur={this.handleBlur}
					input={<Input id="select-multiple-chip"/>}
					renderValue={selected => (
						<div className={classes.chips}>
							{selected.map(code => (
							<InterestChip key={code} label={dataInterest[code].name} className={classes.chip}/>
							))}
						</div>
					)}
					MenuProps={MenuProps}>
					{
						_.map(dataInterest, interest =>
							<MenuItem
								key={interest.code}
								value={interest.code}>
								{interest.name}
							</MenuItem>
						)
					}
				</Select>
				<Collapse in={error} timeout={{enter: 200, exit: 200}}>
					<FormHelperText>
						관심사는 최대 5개까지 선택 가능합니다
					</FormHelperText>
				</Collapse>
			</FormControl>
		)
	}
}

const mapStateToProps = state => ({
	dataInterest: state.dataInterest
})
const mapDispatchToProps = {

}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(SelectInterest));