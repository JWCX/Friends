import React from 'react';
import ContentLoader from 'react-content-loader';
import { Fade } from '@material-ui/core';

export default props => (
	<Fade in={true}>
		<ContentLoader
			style={{width:"522px", height:"820px", margin:0, padding: 0}}
			height={835}
			width={520}
			speed={2}
			primaryColor="#e6edff"
			secondaryColor="#d2e2ff"
			{...props}>

			<rect x="10" y="10" rx="5" ry="5" width="500" height="300" />

			<circle cx="25" cy="340" r="10" />
			<rect x="50" y="330" rx="5" ry="5" width="450" height="20" />

			<circle cx="25" cy="418" r="10" />
			<rect x="50" y="378" rx="5" ry="5" width="450" height="80" />


			<circle cx="25" cy="496" r="10" />
			<rect x="50" y="486" rx="5" ry="5" width="450" height="20" />
			<circle cx="25" cy="544" r="10" />
			<rect x="50" y="534" rx="5" ry="5" width="450" height="20" />
			<circle cx="25" cy="592" r="10" />
			<rect x="50" y="582" rx="5" ry="5" width="450" height="20" />
			<circle cx="25" cy="640" r="10" />
			<rect x="50" y="630" rx="5" ry="5" width="450" height="20" />
			<circle cx="25" cy="688" r="10" />
			<rect x="50" y="678" rx="5" ry="5" width="450" height="20" />
			<circle cx="25" cy="736" r="10" />
			<rect x="50" y="726" rx="5" ry="5" width="450" height="20" />

			<rect x="188" y="774" rx="5" ry="5" width="124" height="40" />
		</ContentLoader>
	</Fade>
)