import React from 'react'
import { AppBar,
		Toolbar,
		Tabs,
		Tab,
		IconButton,
	} from '@material-ui/core';

import { Logo, Board, Friends, Groups } from 'components/AppBarIcons'


export default () => {
  return (
	<AppBar
		position="sticky"
		style={{color:"#AAFFFF", padding: "0px"}}
		>
		<Toolbar
			variant="regular">
			<Tabs value={0}>
				<Tab icon={<Logo/>}/>
				<Tab icon={<Board/>}/>
				<Tab icon={<Friends/>}/>
				<Tab icon={<Groups/>}/>
			</Tabs>

		</Toolbar>


	</AppBar>
  )
}





