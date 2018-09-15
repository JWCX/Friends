import React from 'react';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

class MeMore extends React.Component {
	handleClose = e => {
		if (this.props.anchorEl.contains(e.target)) return;  // 버튼을 클릭한 경우 toggle 메소드와 중복처리 되지 않도록 return
		this.props.handleMoreSelect();
	}
	render() {
		const { anchorEl, open, handleMoreSelect, match, token } = this.props;
		return (
			<Popper open={open} anchorEl={anchorEl} transition disablePortal>
				{
					({ TransitionProps, placement }) => (
					<Grow
						{...TransitionProps}
						id="menu-list-grow"
						style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}>
						<Paper>
							<ClickAwayListener onClickAway={this.handleClose}>
							<MenuList>
							{
								parseInt(match.params.id) === token ?
								<MenuItem style={{fontSize: "0.8em", height: "15px"}} id="setInfo" onClick={handleMoreSelect}>정보수정하기</MenuItem>
								: <React.Fragment>
									<MenuItem style={{fontSize: "0.8em", height: "15px"}} id="block" onClick={handleMoreSelect}>차단하기</MenuItem>
									<MenuItem style={{fontSize: "0.8em", height: "15px"}} id="report" onClick={handleMoreSelect}>신고하기</MenuItem>
								 </React.Fragment>
							}
							</MenuList>
							</ClickAwayListener>
						</Paper>
					</Grow>
				)}
			</Popper>
		);
	}
}

export default MeMore;