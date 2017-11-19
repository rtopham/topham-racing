import React from 'react';
import {Image} from 'react-bootstrap';

export default class Banner extends React.Component{
  constructor(props) {
    super(props);
    this.state = { image: ""};
 
  }

 

  render() {
    let num=(Math.round(Math.random() * (2 - 1)) + 1);  
//    console.log("random number is: "+num+"  ");
    let imagePath="/images/banner"+num+".jpg";  
    return (
        <Image responsive rounded src={imagePath}/>
    );
  }
} 