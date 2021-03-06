import {  useState, useEffect } from 'react';
import "./Navbar.css"
import firebase from "firebase";


function Navbar() {

    var [clicked, setClicked] = useState(0);
    var [isSignedIn, setIsSignedIn] = useState(false);

    var MenuItems = [
        {
            title: 'Book',
            url: '/photographers',
            cName: 'nav-links'
        },
        {
            title: 'About Us',
            url: '/about',
            cName: 'nav-links'
        },
    ];

    // Listen to the Firebase Auth state and set the local state.
  	useEffect(() => {
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			setIsSignedIn(!!user);
		});
		return () => unregisterAuthObserver(); // Make sure we un-register Firebase observers when the component unmounts.
	}, []);

	const signOut = () => {
        firebase.auth().signOut();
		console.log("sign out clicked");
    }

	if (isSignedIn){
		MenuItems.push(
			{
				title: 'Sign Out',
				url: "/",
				cName: 'nav-links'
			},
			{
				title: 'Profile',
				url: "/userProfile",
				cName: 'nav-links'
			}
		);
	}
	else{
		MenuItems.push(
			{
				title: 'Sign In/Up',
				url: '/userProfile',//login
				cName: 'nav-links'
			}
		);
	}


	return(
		<nav className="NavbarItems">
			<a href="/"><h1 className="navbar-logo">Find My Photographer<i className="fas fa-camera"></i></h1></a> 
			<div className="menu-icon" onClick={()=>setClicked(!clicked)}>
				<i className={clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
			</div>
			<ul className={clicked ? 'nav-menu active' : 'nav-menu'}>
				{MenuItems.map((item, index) => {
					return (
						<li key={index}>
							{item.title === "Sign Out" ? <a className={item.cName} href="/" onClick={() => signOut()}>{item.title}</a>: <a className={item.cName} href={item.url}>{item.title}</a>}
						</li>
					)
				})}
			</ul>
		</nav>
	)
}

export default Navbar