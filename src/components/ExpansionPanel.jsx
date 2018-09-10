import React from 'react'
import { ExpansionPanel,
		ExpansionPanelSummary,
		ExpansionPanelDetails,
	} from '@material-ui/core';


export default ({expanded, icon, summary, children, position, top, onClick}) => {
  return (
	<ExpansionPanel style={{ boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)",
		borderRadius:"4px", width:"280px", display:"inline-block", position, top, zIndex:1000}} expanded={expanded}>
		<ExpansionPanelSummary onClick={onClick} expandIcon={icon}>
			{summary}
		</ExpansionPanelSummary>
		<ExpansionPanelDetails>
			{children}
		</ExpansionPanelDetails>
	</ExpansionPanel>
  )
}
