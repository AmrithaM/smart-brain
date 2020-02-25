import React from 'react';

class Signin extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			email: '',
			password: ''
		} 
	}

	onEmailChange = (event) => {
		this.setState({email: event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password: event.target.value});
	}

	onSubmitSignin = () => {

		const {email, password} = this.state;

		fetch('https://vast-lowlands-33866.herokuapp.com/signin',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				email:email,
				password:password
			})
		}).then(response=>response.json())
		.then(user => {

			if(user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');	
			}
			
		})

	}


	render(){

		return(
			<article className="mw6 center shadow-5 br3 pa3 pa4-ns mv3 ba b--black-10">
				<main className="pa4 black-80">

				    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
				      <legend className="f2 fw5 ph0 mh0 hover-white">Sign In</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" hmtlfor="email-address">Email</label>
				        <input onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"/>
				      </div>
				      <div className="mv3">
				        <label className="db fw6 lh-copy f6" hmtlfor="password">Password</label>
				        <input onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"/>
				      </div>
				    </fieldset>
				    <div className="">
				      <input onClick={this.onSubmitSignin} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-white" type="submit" value="Sign in"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={()=> this.props.onRouteChange('register')} className="f4 underline pointer link dim black db hover-white">Register</p>
				    </div>

				</main>
			</article>
		);
	}
}

export default Signin;