import unionClassNames from 'union-class-names';
import React, { Component } from 'react';

export default class MyMap extends Component {
  render() {
    const {
      block,
      className,
      theme = {},
      ...otherProps
    } = this.props;
    // leveraging destructuring to omit certain properties from props
    const {
      blockProps, // eslint-disable-line no-unused-vars
      customStyleMap, // eslint-disable-line no-unused-vars
      customStyleFn, // eslint-disable-line no-unused-vars
      decorator, // eslint-disable-line no-unused-vars
      forceSelection, // eslint-disable-line no-unused-vars
      offsetKey, // eslint-disable-line no-unused-vars
      selection, // eslint-disable-line no-unused-vars
      tree, // eslint-disable-line no-unused-vars
      contentState,
      blockStyleFn,
      ...elementProps
    } = otherProps;
    const combinedClassName = unionClassNames(theme.map, className);
    const { link, mapSrc, data } = contentState.getEntity(block.getEntityAt(0)).getData();
    return (
		<div
			{...elementProps}
			className={combinedClassName}
			role="presentation">
			<div style={{
					padding: "5px",
					width: "100%",
				}}>
				<a href={data.place_url || link}
					target="_blank">
					<img src={mapSrc}
						alt="지도를 가져오지 못했습니다.. 다시 시도해주세요."
						style={{width: "100%"}}/>
					<div style={{position: "absolute", bottom:"50%", left: "50%", transform: "translateX(-50%)"}} className="overlay_info">
						<a><strong>{data.place_name}</strong></a>
						<div className="desc">
							<span className="address">
								<span style={{fontSize: "0.5em", color: "rgb(150,150,150)"}}>
									{data.category_name}
								</span>
								<br/>
								{data.road_address_name}
							</span>
						</div>
					</div>
				</a>
			</div>
		</div>
    );
  }
}
