import React, { Component } from 'react';
import {Link} from 'react-router-dom';

import './topMenu.css'


class Header extends Component {
     constructor(props){
         super(props);
         this.state = { 
            pic : "./background_pic_1.jpg"
         }    
     }

     componentDidMount(){
        this.changeBackground();
     }

    setBackground = () => {

        const images = [
            "./background_pic_1.jpg",
            "./background_pic_2.jpg",
            "./background_pic_3.jpg",
        ]
        const new_background = images[Math.floor(Math.random() * images.length)];   
        this.setState({pic: new_background})
    }

    changeBackground = () => {
        setInterval( () => { this.setBackground()},5000 )
    }

    openBooking = () => {
        
    }

    render() { 
        return (
            <div>
                <div className="headerBackground" style={{backgroundImage:"url('"+ this.state.pic+"')"}}>
                    <Link to='/photographers'>
                    <button className="bookButton btn btn-primary" onClick={this.openBooking}>
                    Book Now!
                    </button>
                    </Link>
                </div> 
            </div>
        );
    }
}
 
export default Header;
