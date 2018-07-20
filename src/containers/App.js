import React, { Component } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import Rank from '../components/Rank/Rank';
import ImgUrlForm from '../components/ImgUrlForm/ImgUrlForm';
import Particles from 'react-particles-js';
import './App.css';
import FaceDetect from '../components/FaceDetect/FaceDetect';
import Authentication from '../components/Authentication/Authentication';
import Register from '../components/Register/Register';

/** 
* Clarifai Api Config 
*/
const ParticlesOptions = {
  particles: {
    number: {
      value: 150,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  }
}

const initialState = {
  imgurl: '',
  imagebox: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

/**
* App Component Config
*/
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  //Face detection logic
  calculateFaceBox = (faceData) => {
    const image = document.getElementById('input-image');
    const width = Number(image.width);
    const height = Number(image.height);
    const box = {
      leftCol: faceData.left_col * width,
      topRow: faceData.top_row * height,
      rightCol: width - (faceData.right_col * width),
      bottomRow: height - (faceData.bottom_row * height)
    }
    this.setState((prevState) => {
       return {
          imagebox: prevState.imagebox = box
       }
    });
  }
  
  handleImgInput = (input) => {
    this.setState({imgurl: input});
    fetch('https://face-finder-ugesh-malempati.herokuapp.com/imageurl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: input
      })      
    })
    .then((response) => response.json())
    .then(data => this.calculateFaceBox(data))
    .catch(err => console.log(err));
    fetch('https://face-finder-ugesh-malempati.herokuapp.com/image', {
      method: 'put',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        id: this.state.user.id
      })      
    })
    .then((response) => response.json())
    .then((count) => this.setState(Object.assign(this.state.user, {entries: count})))
    .catch(err => console.log(err));
  }
  //loading user profile 
  handleUserData = (userData) => {
    this.setState({user: {
      id: userData.id,
      name: userData.name,
      email: userData.email,
      entries: userData.entries,
      joined: userData.joined
    }})
  }
  //Handling App Routes
  handleRouteChange = (routeData) => {
      routeData === 'home' ? this.setState({isSignedIn: true}) : this.setState(initialState);  
      this.setState({route: routeData});
  }
  
  render() {
    return (
      <div className="container">
        <Particles className="particles" params={ParticlesOptions} />
        <Navigation onRouteChange={this.handleRouteChange} issigned={this.state.isSignedIn}/>
        { this.state.route === 'home' ?
         <div>
           <Logo />
           <div className="main-div">
             <Rank username={this.state.user.name} imageEntries={this.state.user.entries}/>
             <ImgUrlForm handleInput={this.handleImgInput} />
           </div>
           <FaceDetect imgURL={this.state.imgurl} imgBox={this.state.imagebox} />    
         </div>
         : (this.state.route === 'signin' ?
               <div>
                 <Logo />
                 <Authentication loadUserData={this.handleUserData} onRouteChange={this.handleRouteChange}/>
               </div>  
            : 
               <div>
                 <Logo />
                 <Register loadUserData={this.handleUserData} onRouteChange={this.handleRouteChange}/>
               </div>
            )  
        }
      </div>
    );
  }
}

export default App;
