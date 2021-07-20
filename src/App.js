import React from 'react';
import './App.css';
import Navbar from "./components/Navbar/Navbar"
import Header from './components/topMenu'
import HomeContent from './components/HomePageContent/HomePageContent'




function App() {
    return (
        <div className="App">
            <Navbar />
            <Header />
            <HomeContent />
        </div>
  );
}

export default App;
