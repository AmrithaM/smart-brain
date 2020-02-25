import React from 'react';
import './FaceRecognition.css';
import BoundingBox from './BoundingBox';

const FaceRecognition = ({imageURL, boxes}) => {

	const boundingBoxHTML = boxes.map((box, index) => {
		return <BoundingBox box={box} key={index} legend={index+1}/>
	})

	return (
			<div className="center ma">
				<div className="absolute mt2">
					<img id="input_image" className="shadow-5" src={imageURL} alt="" width="500px" height="auto"/>
					{boundingBoxHTML}
				</div>
			</div>
		);
}

export default FaceRecognition;