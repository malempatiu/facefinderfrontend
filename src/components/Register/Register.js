import React from 'react';
import '../Authentication/Authentication.css';

class Register extends React.Component {
    constructor(){
        super();
        this.state = {
             name: '',
             email: '',
             password: '',
             error: ''
        };
    }
    getUserName = (e) => {
        this.setState({name: e.target.value});
    }
    getUserEmail = (e) => {
        this.setState({email: e.target.value});
    }
    getUserPassword = (e) => {
        this.setState({password: e.target.value});
    }
    handleRegister = () => {

        fetch('https://face-finder-ugesh-malempati.herokuapp.com/register', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then((response) => response.json())
        .then((userData) => {
            if(userData.name){
                this.props.loadUserData(userData);
                this.props.onRouteChange('home');
            }else {
                this.setState({error: userData});
            }
        });
    }
    render() {
        return (
            <div className="card w-75">
                <div className="card-body mw-100">
                    <h1 className="card-title text-center font-weight-bold text-info">Register</h1>
                    <p className="text-center text-warning">{this.state.error}</p>
                    <div>
                        <div className="form-group">
                            <label className="font-weight-bold text-white">Name</label>
                            <input type="email" className="form-control email text-info" onChange={this.getUserName} placeholder="Enter user name" />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-white">Email</label>
                            <input type="email" className="form-control email text-info" onChange={this.getUserEmail}placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label className="font-weight-bold text-white">Password</label>
                            <input type="password" className="form-control password text-info" onChange={this.getUserPassword} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary sign-in" onClick={this.handleRegister}>Register</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Register;