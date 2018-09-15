import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dialog as MuiDialog,
		Grid,
		 } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { closeMePage } from 'actions';
import { MeMain,
		MeFriends,
		MeGroups,
		MeInfo,
		MeMore } from 'containers';
import { CancelButton,
		MoreButton,
		FriendButton,
		GroupButton,
	} from 'components';


const styles = {
	paper: {
		padding: "20px 20px 20px 20px",
		minWidth:"650px",
		width:"700px",
		maxWidth: "1000px",
		// minWidth: "1800px",
		minHeight: "850px",
		maxHeight: "100vh",
		borderRadius: "10px",
		margin: "0",
		transition: "all 0.2s ease-in-out"
	},
	paperWidthXs: {
		width: "100%",
	},
	container: {
	}
}

class Me extends React.Component {
	state = {
		currentView: 0,  // 현재 뷰 0: me의 친구리스트, 1: me의 그룹리스트, 2: 정보수정창
		openMore: false,
	 }
	handleClose = () => {
		if(this.state.currentView === 2)
			return this.setState({currentView: 0});
		this.props.closeMePage();
		console.log(this.props.match.params['0']);
		this.props.history.push(this.props.match.params['0']);
	}
	handleMore = () => {	/* 더보기 버튼 클릭시 메뉴 활성화 */
		this.setState(state => ({ openMore: !state.openMore }));
	}
	handleMoreSelect = e => {	
		this.setState({ openMore: false });
		if(!e) return;
		switch(e.target.id){
			case "block":
				console.log("유저차단처리");
				break;
			case "report":
				console.log("유저신고처리");
				break;
			case "setInfo":
				this.setState({currentView: 2});
				break;
			default:
		}
	}
	handleSwitchView = view => {
		this.setState({currentView: view});
	}
	render() {
		const { classes, onClose, disableBackdrop, icon, redirect, match, history, token, ...other } = this.props;
		const { currentView, openMore } = this.state;
		return (
			<MuiDialog
				classes={{paper: classes.paper, paperWidthXs: classes.paperWidthXs}}
				disableBackdropClick={disableBackdrop}
				onClose={this.handleClose}
				aria-labelledby="simple-dialog-title"
				disableEscapeKeyDown={currentView===2}
				{...other}>
					<Grid container
					direction="row"
					justify="flex-end"
					alignItems="flex-start"
					spacing={0}>
						{ currentView !== 2 &&
							<Grid item>
								<React.Fragment>
									<MoreButton
										buttonRef={ node => { this.anchorEl = node; } }
										onClick={this.handleMore}/>
								</React.Fragment>
							</Grid>
						}
						<Grid item>
							<CancelButton onClick={this.handleClose}/>
						</Grid>
					</Grid>
					{
						currentView === 2 ? <MeInfo history={history} match={match} handleSwitchView={this.handleSwitchView}/>
						: <React.Fragment>
							<Grid container
								classes={{container:classes.container}}
								direction="row"
								justify="space-around"
								alignItems="flex-start"
								spacing={8}>
								<Grid item style={{padding:"10px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px"}}>
									<MeMain  toInfo={this.toInfo}/>
								</Grid>
								<Grid item style={{padding:"10px", boxShadow:"0 1px 10px -2px rgb(150,150,150)", borderRadius:"10px"}}>
									<Grid container
										direction="column"
										justify="space-evenly"
										alignItems="flex-start">
										<Grid item style={{paddingTop:"15px"}}>
											<FriendButton
												onClick={() => {this.handleSwitchView(0)}}
												selected={currentView===0}/>
											&nbsp;
											<GroupButton
												onClick={() => {this.handleSwitchView(1)}}
												selected={currentView===1}/>
										</Grid>
										<Grid item>
											{ currentView === 0 ? <MeFriends/> : <span></span>}
											{ currentView === 1 ? <MeGroups/> : <span></span>}
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</React.Fragment>
					}
					{
						currentView !== 2 ? <MeMore
							token={token}
							match={match}
							open={openMore}
							anchorEl={this.anchorEl}
							handleMoreSelect={this.handleMoreSelect}/> : ""
					}
			</MuiDialog>
		);
	}
}

const mapStateToProps = state => ({
	token: state.token
})
const mapDispatchToProps = {
	closeMePage
}

export default withRouter(withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Me)));