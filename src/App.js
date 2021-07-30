import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import HomePage from './HomePage'
import Header from './components/topMenu'
import HomeContent from './components/HomePageContent/HomePageContent'
import ShowClientsAndPhotographers from './components/showClients/showClientsAndPhotographers';
import AboutUs from './AboutUs';
import Booking from './Booking';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function App() {
    
    return (
        <Router>
        <switch>
            <div>
                <Navbar />
                <Route exact path="/" component={HomePage} />
                <Route path="/about" component={AboutUs} />
                <Route path="/booking" component={Booking} />
            </div>
        </switch>
        </Router>
  );
}

export default App;
