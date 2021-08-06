import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import HomePage from './components/HomePage/HomePage'
import AboutUs from './components/AboutUs/AboutUs';
import BookingPhotographer from './components/Photographer/photographers';
import SignInScreen from './components/SignInUp/Firebase'
import PhotographerProfile from './components/UserProfile/PhotographerProfile'
import Booking from './components/Booking/Booking'


function App() {

    return (
        <Router>
            <Switch>
                <>
                    <Navbar />
                    <Route exact path="/" component={HomePage} />
                    <Route path="/about" component={AboutUs} />
                    <Route path="/photographers" component={BookingPhotographer} />
                    <Route path="/login" component={SignInScreen} />
                    <Route path="/photographerProfile" component={PhotographerProfile} />
                    <Route path="/book" component={Booking} />
                </>
            </Switch>
        </Router>
    );
}

export default App;
