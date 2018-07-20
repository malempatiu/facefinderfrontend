import React from 'react';
import './Navigation.css';
const Navigation = (props) => {
    if(props.issigned){
        return (
            <nav id="nav-div" className="nav justify-content-end">
                 <p className="nav-item nav-link font-weight-bold" onClick={() => props.onRouteChange('signin')}>Sign Out</p>
            </nav>
        );
    } else {
        return (
            <nav id="nav-div" className="nav justify-content-end">
                 <p className="nav-item nav-link font-weight-bold" onClick={() => props.onRouteChange('signin')}>Sign In</p>
                 <p className="nav-item nav-link font-weight-bold" onClick={() => props.onRouteChange('register')}>Register</p>
            </nav>
        );
    }
};

export default Navigation;
