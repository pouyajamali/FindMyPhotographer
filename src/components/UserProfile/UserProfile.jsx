import {  useState, useEffect } from 'react';
import firebase from "firebase";
import PhotographerProfile from './PhotographerProfile';
import ClientProfile from './ClientProfile';
import SignInScreen from '../SignInUp/Firebase';
import ExtraSignUpInfo from './ExtraSignUpInfo';

function UserProfile(){

    var [isSignedIn, setIsSignedIn] = useState(false);
	var [user, setUser] = useState(0);
    var [userData, setUserData] = useState(0);

    const getUserData = async (user) => {//
        // window.location.reload()
        var userDataFirebase = user.providerData[0]
        // console.log("userDataFirebase",userDataFirebase)
        var url = process.env.REACT_APP_BACKEND_URL + '/getInfoFromEmail/' + userDataFirebase.email;
        const res = await fetch(url);
        const data = await res.json()
        // console.log ("data",data);
        return data

        // console.log("getting data for current user ",user);
        // var dummy_photographer_user = {
        //     _id: "1",
        //     name: "pouya",
        //     email: "pouya@gmail.com",
        //     phone: "1234567890",
        //     fees: "100$",
        //     tags: [" weddings ", " cars "],
        //     type: "photographer"
        // }
        // // dummy_photographer_user = {}
        // return dummy_photographer_user;
    };

	useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			setIsSignedIn(!!user);
		});
		return ()=>unregisterAuthObserver();
	}, []);

    useEffect(() => {
        let currentUser = firebase.auth().currentUser;
        setUser(currentUser);
        if (currentUser !== null){
            var data = getUserData(currentUser).then((data)=>{
                console.log ("data",data);
                setUserData(data);
                console.log("useEffect", user, userData);
            });
        }
    },[isSignedIn]);

    if (isSignedIn && userData.type === "client"){
        return ( <ClientProfile user={userData.value[0]}/> );
    }
    else if (isSignedIn && userData.type === "photographer"){
        return ( <PhotographerProfile user={userData.value[0]}/> );
    }
    else if (isSignedIn && userData.type === null){
        return(<ExtraSignUpInfo/>);
    }
    else{
        return( <SignInScreen/> );
    }

};
export default UserProfile;