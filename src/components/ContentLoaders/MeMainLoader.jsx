import React from 'react';
import ContentLoader from 'react-content-loader';
import { Fade } from '@material-ui/core';

export default props => (
	<Fade in={true}>
		<ContentLoader
			style={{width:"322px", height:"770px", margin:0, padding: 0}}
			height={785}
			width={320}
			speed={2}
			primaryColor="#e6edff"
			secondaryColor="#d2e2ff"
			{...props}>

			<rect x="10" y="10" rx="5" ry="5" width="300" height="300" />

			<circle cx="25" cy="340" r="10" />
			<rect x="50" y="330" rx="5" ry="5" width="250" height="20" />
			<circle cx="25" cy="388" r="10" />
			<rect x="50" y="378" rx="5" ry="5" width="250" height="20" />
			<circle cx="25" cy="436" r="10" />
			<rect x="50" y="426" rx="5" ry="5" width="250" height="20" />
			<circle cx="25" cy="484" r="10" />
			<rect x="50" y="474" rx="5" ry="5" width="250" height="20" />
			<circle cx="25" cy="562" r="10" />
			<rect x="50" y="522" rx="5" ry="5" width="250" height="80" />

			<rect x="30" y="731" rx="5" ry="5" width="124" height="40" />
			<rect x="165" y="731" rx="5" ry="5" width="124" height="40" />
		</ContentLoader>
	</Fade>
)