import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import HomePage from './components/HomePage/HomePage'
import AboutUs from './components/AboutUs/AboutUs';
import Booking from './components/Booking/Booking';
import SignInScreen from './components/SignInUp/Firebase'
import PhotographerProfile from './components/UserProfile/PhotographerProfile'


function App() {
    
    return (
        <Router>
        <Switch>
            <>
                <Navbar />
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutUs} />
                <Route path="/booking" component={Booking} />
                <Route path="/login" component={SignInScreen} />
                <Route path="/photographerProfile" component={PhotographerProfile} />
            </>
        </Switch>
        </Router>
  );
}

export default App;
