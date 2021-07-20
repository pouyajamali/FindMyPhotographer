import React, { Component } from 'react';
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

    render() { 
        return (
            <div>
            <div className="headerBackground" style={{backgroundImage:"url('"+ this.state.pic+"')"}}></div> 
            </div>
        );
    }
}
 
export default Header;


// function setBackground(){

//     const images = [
//         'url("background_pic_1.jpg")',
//         'url("background_pic_2.jpg")',
//         'url("background_pic_3.jpg")',
//     ]

//     const current_background = document.querySelector('h1')
//     const new_background = images[Math.floor(Math.random() * images.length)]
//     current_background.style.background = new_background;
//     document.getElementById("top_home_page").style.height= "100%"; 
//     document.getElementById("top_home_page").style.backgroundRepeat = "no-repeat"; 
//     document.getElementById("top_home_page").style.backgroundSize = "cover"; 


    
// }



// function changeBackground(){
//     setInterval(setBackground,  5000)
// }