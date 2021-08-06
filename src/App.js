import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import HomePage from './components/HomePage/HomePage'
import AboutUs from './components/AboutUs/AboutUs';
import UserProfile from './components/UserProfile/UserProfile';
import BookingPhotographer from './components/Photographer/photographers';
import Booking from './components/Booking/Booking';
import PhotographerPage from './components/UserProfile/PhotographerPage';

function App() {

    return (
        <Router>
        <Switch>
            <>
                <Navbar />
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutUs} />
                <Route path="/userProfile" component={UserProfile} />
                <Route path="/photographers" component={BookingPhotographer} />
                <Route path="/book" component={Booking} />
                <Route path="/photographerPage" component={PhotographerPage}/>
            </>
        </Switch>
        </Router>
    );
}

export default App;
