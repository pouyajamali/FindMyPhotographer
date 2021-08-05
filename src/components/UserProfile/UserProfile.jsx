import {  useState, useEffect } from 'react';
import firebase from "firebase";
import PhotographerProfile from './PhotographerProfile';
import ClientProfile from './ClientProfile';
import { Redirect } from 'react-router-dom';
import SignInScreen from '../SignInUp/Firebase';

function UserProfile(){

    var [isSignedIn, setIsSignedIn] = useState(false);
	var [user, setUser] = useState(0);
    var [userData, setUserData] = useState(0);

    const getUserData =  (user) => {//async
        // const res = await fetch('http://localhost:4000/photographers')
        // const data = await res.json()
        // console.log (data);
        // return data
        var dummy_photographer_user = {
            _id: "1",
            name: "pouya",
            email: "pouya@gmail.com",
            phone: "1234567890",
            fees: "100$",
            tags: [" weddings ", " cars "],
            type: "photographer"
        }
        return dummy_photographer_user;
    };

	useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            // setUser(user)
			setIsSignedIn(!!user);
            // let currentUser = firebase.auth().currentUser;
            // setUser(currentUser);
            // var data = getUserData(currentUser);
            // setUserData(data);
            // // console.log("useEffect", user, userData);
		});
		return ()=>unregisterAuthObserver();
	}, []);

    useEffect(() => {
        let currentUser = firebase.auth().currentUser;
        setUser(currentUser);

        var data = getUserData(currentUser);
        setUserData(data);
        console.log("useEffect", user, userData);
    },[isSignedIn]);

    // return(
    //     <div> 
    //         { isSignedIn ? PhotographerProfile : Navbar}
    //     </div>
    // );

    if (isSignedIn && userData.type === "client"){
        return ( <ClientProfile user={userData}/> );
    }
    else if (isSignedIn && userData.type === "photographer"){
        return ( <PhotographerProfile user={userData}/> );
    }
    // else if (newUser){

    // }
    else{
        setTimeout(1000);
        return( <SignInScreen/> );
    }
    
};
export default UserProfile;