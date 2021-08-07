import React, { Component } from 'react';
import './HomePageContent.css';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import SettingsIcon from '@material-ui/icons/Settings';
import BeenhereIcon from '@material-ui/icons/Beenhere';



class HomeContent extends Component {
    render() { 
        return (
            <div className="tableHolder">
                <div className="table">
                    <FlashOnIcon fontSize="large"/>
                    <h2>Fast</h2>
                    <p>Quickest website to book your photographers</p>
                </div>
                <div className="table">
                    <SettingsIcon fontSize="large"/>
                    <h2>Efficient</h2>
                    <p>Book you photographer by time, category or the artist</p>
                </div>
                <div className="table">
                    <BeenhereIcon fontSize="large"/>
                    <h2>Safe</h2>
                    <p>Verified photographers and safe payment options</p>
                </div>
            </div>
        );
    }
}
 
export default HomeContent;

