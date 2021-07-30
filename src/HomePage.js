import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Header from './components/topMenu'
import HomeContent from './components/HomePageContent/HomePageContent'
import ShowClientsAndPhotographers from './components/showClients/showClientsAndPhotographers';
import aboutUs from './AboutUs';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';


function HomePage() {
    
    return (
        <div className="App">
            <Header />
            <HomeContent />
            <ShowClientsAndPhotographers />
        </div>
  );
}

export default HomePage;
