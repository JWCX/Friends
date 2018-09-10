import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { RequestIcon } from 'components/AppBarIcons';

const drawerWidth = 50;

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
});

class PersistentDrawer extends React.Component {
  render() {
    const { classes, theme, open } = this.props;
    return (
			open ?
				<Drawer
					variant="persistent"
					anchor="right"
					open={open}
					classes={{
					paper: classes.drawerPaper,
					}}
				>
					<div className={classes.drawerHeader}>
					<IconButton onClick={this.handleDrawerClose}>
						<ChevronRightIcon />
					</IconButton>
					</div>{
						[0,1,2,3,4,5,6,8,9,0,11,12,13,14,15,16,17,19,20,21,21,31,1,1,1,1,1,1,1,1,1]
							.map((x,y) => {
							return (<div key={y}>
										<Divider />
										<List><RequestIcon/></List>
									</div>)
						})
					}

				</Drawer>
				:""
    );
  }
}

export default withStyles(styles, { withTheme: true })(PersistentDrawer);