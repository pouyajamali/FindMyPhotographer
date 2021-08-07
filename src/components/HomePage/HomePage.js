import React from 'react';
import '../../App.css';
import Header from './topMenu'
import HomeContent from './HomePageContent'
import ShowClientsAndPhotographers from '../showClients/showClientsAndPhotographers';


function HomePage() {
    
    return (
        <div className="App">
            <Header />
            <HomeContent />
            {/* <ShowClientsAndPhotographers /> */}
        </div>
  );
}

export default HomePage;
