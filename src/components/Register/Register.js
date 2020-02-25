import React from 'react';

class Register extends React.Component{

	constructor(props){
		super(props);
		this.state = {
			name: '',
			email: '',
			password: ''
		}
	}	

	onNameChange = (event) => {
		this.setState({name:event.target.value});
	}

	onEmailChange = (event) => {
		this.setState({email:event.target.value});
	}

	onPasswordChange = (event) => {
		this.setState({password:event.target.value});
	}

	onSubmitRegister = () => {

		const {name,email, password} = this.state;

		fetch('https://vast-lowlands-33866.herokuapp.com/register',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				name: name,
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
				      <legend className="f2 fw5 ph0 mh0 hover-white">Register</legend>
				      <div className="mt3">
				        <label className="db fw6 lh-copy f6" hmtlfor="name">Name</label>
				        <input onChange={this.onNameChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"/>
				      </div>
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
				      <input onClick={this.onSubmitRegister} className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib hover-white" type="submit" value="Register"/>
				    </div>
				    <div className="lh-copy mt3">
				      <p onClick={()=> this.props.onRouteChange('signin')} className="underline pointer f4 link dim black db hover-white">Sign in</p>
				    </div>
				  
				</main>
			</article>
		);

	}
}

export default Register;