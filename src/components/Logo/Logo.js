import React from 'react';
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import logo from './logo.png';

const Logo = () => {

	return(
		<div className="ma3">
			<Tilt className="br2 shadow-2 Tilt">
		      <div className="pa3">
		        <img style={{paddingTop: '5px'}} alt="logo" src={logo} />
		      </div>
		    </Tilt>
		</div>
		);
}

export default Logo;