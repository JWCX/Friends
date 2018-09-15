import React from 'react';
import ContentLoader from 'react-content-loader';
import { Fade } from '@material-ui/core';

export default ({hideButtons}, props) => (
	<Fade in={true}>
		<ContentLoader
			style={{width:"300px", height:"760", margin:"-50 0 0 0", padding: 0}}
			height={760}
			width={300}
			speed={2}
			primaryColor="#e6edff"
			secondaryColor="#d2e2ff"
			{...props}>
			{
				hideButtons && <React.Fragment>
					<circle cx="15" cy={20} r="15"/>
					<circle cx="50" cy={20} r="15"/>
					<rect x="90" y={740} rx="5" ry="5" width="120" height="20"/>
				</React.Fragment>
			}
			{
				[0,1,2,3,4,5,6,7,8,9].map( x =>
					<React.Fragment key={x}>
						<circle cx="35" cy={80+68*x} r="25"/>
						<rect x="80" y={65+68*x} rx="5" ry="5" width="200" height="25"/>
					</React.Fragment>
			)}
		</ContentLoader>
	</Fade>
)