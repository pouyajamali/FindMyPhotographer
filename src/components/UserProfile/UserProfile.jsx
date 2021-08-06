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
        var url = process.env.REACT_APP_BACKEND_URL + '/getInfoFromEmail/' + user.email;
        const res = await fetch(url);
        const data = await res.json()
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
        if (currentUser !== null){
            var data = getUserData(currentUser).then((data)=>{
                setUserData(data);
            });
        }
    },[isSignedIn]);

    if (isSignedIn && userData.type === "client"){
        console.log("client",userData)
        return ( <ClientProfile user={userData.value[0]}/> );
    }
    else if (isSignedIn && userData.type === "photographer"){
        console.log("photographer",userData)
        return ( <PhotographerProfile user={userData.value[0]}/> );//
    }
    else if (isSignedIn && userData.type === null){
        return(<ExtraSignUpInfo user={ user.providerData[0] }/>);
    }
    else{
        return( <SignInScreen/> );
    }

};
export default UserProfile;