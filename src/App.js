import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Header from './components/topMenu'
import HomeContent from './components/HomePageContent/HomePageContent'
import ShowClientsAndPhotographers from './components/showClients/showClientsAndPhotographers';







function App() {
    
    return (
        <div className="App">
            <Navbar />
            <Header />
            <HomeContent />
            <ShowClientsAndPhotographers />
        </div>
  );
}

export default App;
