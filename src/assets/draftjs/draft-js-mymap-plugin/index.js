import decorateComponentWithProps from 'decorate-component-with-props';
import addMap from './modifiers/addMap';
import MapComponent from './Map';
import mapStyles from './mapStyles.css';

const defaultTheme = {
	map: mapStyles.map,
};

export default (config = {}) => {
	const theme = config.theme ? config.theme : defaultTheme;
	let Map = config.MapComponent || MapComponent;
	if (config.decorator) {
		Map = config.decorator(Map);
	}
	const ThemedMap = decorateComponentWithProps(Map, { theme });
	return {
		blockRendererFn: (block, { getEditorState }) => {
			if (block.getType() === 'atomic') {
				const contentState = getEditorState().getCurrentContent();
				const entity = block.getEntityAt(0);
				if (!entity)
					return null;
				const type = contentState.getEntity(entity).getType();
				if (type === 'MAP' || type === 'map') {
					return {
					component: ThemedMap,
					editable: false,
					};
				}
				return null;
			}
			return null;
		},
		addMap,
	};
};
export const Map = MapComponent;
