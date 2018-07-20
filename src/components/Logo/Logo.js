import React from 'react';
import logo from './logo.png';
import Tilt from 'react-tilt'
 
const Logo = () => {
    return (
        <div>
             <Tilt className="Tilt" options={{ max : 50 }} style={{ height: 50, width: 200 }} >
                 <div className="Tilt-inner text-center"><img src={logo} alt="logo" /></div>
             </Tilt>     
        </div>
    );
};

export default Logo;