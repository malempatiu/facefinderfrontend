import React from 'react';
import './ImgUrlForm.css';

class ImgUrlForm extends React.Component{
    handleImgUrl = (e) => {
         e.preventDefault();
         const data = e.target.elements.imgurl.value;
         console.log(data);
         if(data){
             this.props.handleInput(data);
             e.target.elements.imgurl.value = '';
         }
    }
    render(){
        return (
            <div>
                <form onSubmit={this.handleImgUrl}>
                    <div className="form-group">
                         <input type="text" className="form-control" name="imgurl" placeholder="image url" />
                    </div>
                    <button className="form-control btn btn-dark" type="submit">Detect Face</button>
                </form>
            </div>
        );
    };
}


export default ImgUrlForm;