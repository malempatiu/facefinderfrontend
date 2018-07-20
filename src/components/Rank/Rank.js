import React from 'react';
import './Rank.css';

const Rank = (props) => {
    return (
         <div>
             <div className="text-center font-weight-bold rank-user">
                 <p>{props.username}, your image count is ...</p> 
             </div>
             <div className="text-center rank-num">
                 <p>{`#${props.imageEntries}`}</p> 
             </div>
         </div>
    );
};

export default Rank;