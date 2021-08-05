import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import HomePage from './components/HomePage/HomePage'
import AboutUs from './components/AboutUs/AboutUs';
import UserProfile from './components/UserProfile/UserProfile';
import Booking from './components/Booking/photographers';
import bookingPhotographer from './components/Booking/Booking'

function App() {
    
    return (
        <Router>
        <Switch>
            <>
                <Navbar />
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutUs} />
                <Route path="/userProfile" component={UserProfile} />
                {/* <Route path="/login" component={SignInScreen} />
                <Route path="/photographerProfile" component={PhotographerProfile} /> */}
                <Route path="/photographers" component={Booking} />
                <Route path="/photographers/book" component={bookingPhotographer} />
            </>
        </Switch>
        </Router>
  );
}

export default App;
