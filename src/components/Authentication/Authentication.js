import React from 'react';
import './Authentication.css';

class Authentication extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signinemail: '',
            signinpassword: '',
            error: ''
        }
    }
    onEmailChange = (e) => {
        this.setState({signinemail: e.target.value});
    }
    onPasswordChange = (e) => {
        this.setState({signinpassword: e.target.value});
    }
    handleSignin = () => {
        fetch('https://face-finder-ugesh-malempati.herokuapp.com/signin', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signinemail,
                password: this.state.signinpassword
            })
        })
        .then((response) => response.json())
        .then((userData) => {
            if(userData.id){
                this.props.loadUserData(userData);
                this.props.onRouteChange('home');
            } else {
                this.setState({error: userData});
            }
        });
    }
    render() {
        return (
            <div className="card w-75">
                <div className="card-body mw-100">
                    <h1 className="card-title text-center font-weight-bold text-info">Sign In</h1>
                    <p className="text-center text-warning">{this.state.error}</p>
                    <div>
                        <div className="form-group">
                            <label className="font-weight-bold text-white">Email</label>
                            <input type="email" className="form-control email text-info" onChange={this.onEmailChange} placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-white">Password</label>
                            <input type="password" className="form-control password text-info" onChange={this.onPasswordChange} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary sign-in" onClick={this.handleSignin}>Sign In</button>
                        <p id="rg-route" className="font-weight-bold" onClick={() => this.props.onRouteChange('register')}>Register</p>
                    </div>
                </div>
            </div>
        );
    }
};

export default Authentication;