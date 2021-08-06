import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import HomePage from './components/HomePage/HomePage'
import AboutUs from './components/AboutUs/AboutUs';
import UserProfile from './components/UserProfile/UserProfile';
import Booking from './components/Booking/photographers';
import bookingPhotographer from './components/Booking/Booking'
import ExtraSignUpInfo from './components/UserProfile/ExtraSignUpInfo';
import PhotographerProfile from './components/UserProfile/PhotographerProfile';
import ClientProfile from './components/UserProfile/ClientProfile';

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
                <Route path="/clientProfile" component={ClientProfile} />
                <Route path="/photographers" component={Booking} />
                <Route path="/photographers/book" component={bookingPhotographer} />
                <Route path="/extraSignUpInfo" component={ExtraSignUpInfo} />
            </>
        </Switch>
        </Router>
  );
}

export default App;
