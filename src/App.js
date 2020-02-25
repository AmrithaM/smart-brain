import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';
import Particles from 'react-particles-js';

const particlesProperties = {
      "particles": {
          "number": {
              "value": 160,
              "density": {
                  "enable": false
              }
          },
          "size": {
              "value": 10,
              "random": true
          },
          "move": {
              "direction": "bottom",
              "out_mode": "out"
          },
          "line_linked": {
              "enable": false
          }
      },
      "interactivity": {
          "events": {
              "onclick": {
                  "enable": true,
                  "mode": "remove"
              }
          },
          "modes": {
              "remove": {
                  "particles_nb": 10
              }
          }
      }
}

const initialState = {
      input: '',
      imageURL: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: [],
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  findNumberofFaces = (data) => {
    const faces = data.outputs[0].data.regions;

    let boxCoordinates = faces.map(face => {
      return this.calculateFaceLocation(face.region_info.bounding_box, face.data.concepts);
    })
    this.setBoxCoordinates(boxCoordinates);
  }

  calculateFaceLocation = (data, prediction) => {
      
      const image = document.getElementById('input_image');
      const width = Number(image.width);
      const height = Number(image.height);

      return ({
        leftCol: data.left_col*width,
        topRow: data.top_row*height,
        rightCol: width-(data.right_col*width),
        bottomRow: height-(data.bottom_row*height),
        name: prediction[0].name,
        value: prediction[0].value
      });
  }

  setBoxCoordinates = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onSubmit = () => {
    
    this.setState({imageURL: this.state.input});
    
      fetch('https://vast-lowlands-33866.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          input: this.state.input
        })
      })
      .then(response => response.json())
      .then(response => {
          if(response){
            fetch('https://vast-lowlands-33866.herokuapp.com/image',{
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user,{entries: count}))
            })
            .catch(console.log)
          }
          this.findNumberofFaces(response);
          document.getElementById('prediction-result').scrollIntoView();
      }) 
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {

    if(route==='signout'){
      this.setState(initialState)
    }else if(route==='home'){
      this.setState({isSignedIn: true});
    }

    this.setState({route: route});
  }

  render(){

    const {isSignedIn, route, box, imageURL, user} = this.state;
    
    return (
    <div className="App">
      
      <Particles className="particles" params={particlesProperties} />
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange} /> 

      { route === 'home' 
        ?
          <div>
              <Logo />
              <Rank name={user.name} entries={user.entries}/>
              <ImageLinkForm  onButtonSubmit={this.onSubmit} onInputChange={this.onInputChange}/>
              <FaceRecognition boxes={box} imageURL={imageURL}/>
          </div>
        :
          route === 'register' 
          ?
          <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
          :
          <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
            
        }
    </div>
    );
  }
}


export default App;
