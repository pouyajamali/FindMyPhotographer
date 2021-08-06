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
        var url = process.env.REACT_APP_BACKEND_URL + '/getInfoFromEmail/' + user.email;
        const res = await fetch(url);
        const data = await res.json()
        // console.log ("data",data);
        return data
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
        console.log("hkhjjh",currentUser)
        if (currentUser !== null){
            var data = getUserData(currentUser).then((data)=>{
                // console.log ("data",data);
                setUserData(data);
                // console.log("useEffect", user, userData);
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
        // console.log(user.providerData[0])
        return(<ExtraSignUpInfo user={ user.providerData[0] }/>);
    }
    else{
        return( <SignInScreen/> );
    }

};
export default UserProfile;