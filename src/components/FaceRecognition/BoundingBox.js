import React from 'react';

const BoundingBox = ({box, legend}) =>{
	return(
			<div id="prediction-result">
				<div className="prediction-text f3" style={{top: box.topRow, left: box.leftCol}}>{legend}</div>
				<div className="bounding-box" style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
				<div className="f3">{legend}) {box.name} ({(box.value*100).toFixed(2)}%)</div>
			</div>
	);
}

export default BoundingBox;