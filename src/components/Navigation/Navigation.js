import React from 'react';


const Navigation = ({onRouteChange, isSignedIn}) => {
	
		if(isSignedIn){
			return (
				<nav style={{display: 'flex', justifyContent: 'flex-end'}}>
					<p onClick={()=>onRouteChange('signout')} className="f3 link dim black underline pa3 pointer">Sign out</p>
				</nav>
				);
		}else{
			return(<div className="f1 center ma2 pa3 shadow-5 fw6 mb5 hover-gold">Smart Brain</div>);
		}

}

export default Navigation;