import React from 'react';
import './ImageLinkForm.css'
import Tilt from 'react-parallax-tilt';



const ImageLinkForm = ({onInputChange, onButtonSubmit}) =>{

	return(
		<div>
			<p className="f3">
				{'This Magic Brain will detect celebrity in pictures. Give it a try!'}
			</p>

			<div className='center'>
				<Tilt className="br2 shadow-2">
					<div className="form center shadow-5 pa4 br3">
						<input onChange={onInputChange} className="shadow-5 f4 pa2 w-70 center" type='text' />
						<button onClick={onButtonSubmit} className="shadow-5 w-30 grow f4 link ph3 pv2 dib mid-gray bg-gold">Detect</button>
					</div>
				</Tilt>
			</div>
		</div>
		);
}

export default ImageLinkForm;