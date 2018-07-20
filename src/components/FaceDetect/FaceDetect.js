import React from 'react';
import './FaceDetect.css';

const FaceDetect = (props) => {
    return (
         <div className="img-div">
            <div id="pb" className="position-absolute">
             {props.imgURL && <img id="input-image" className="img-thumbnail" src= {props.imgURL} alt="detectedimg"/>}
             <div className="bounding-box" style={{top: props.imgBox.topRow, right:props.imgBox.rightCol, bottom: props.imgBox.bottomRow, left: props.imgBox.leftCol}}></div>
            </div>
         </div>
    );
};

export default FaceDetect;