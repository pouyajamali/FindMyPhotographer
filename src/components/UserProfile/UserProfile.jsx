import axios from 'axios';
import {useState, useEffect} from 'react';
import firebase from "firebase";
import { Redirect } from "react-router-dom"

var dummy_photographer_user = {
	_id: "1",
	name: "pouya",
	email: "pouya@gmail.com",
	phone: "1234567890",
	fees: "$100",
	tags: ["wedding", "cars"],
	type: "photographer"
};

var dummy_client_user = {
	_id: "0",
	name: "kazi",
	email: "kazi@sfu.ca",
	phone: "0987654321",
	budget: "$150",
	type: "client"
};

var images = [
	{
		_id: "userID",
		image: [{  },{  }],
	},
	{
		_id: "userID",
		image: [{  },{  }],
	},
];

var review = [
	{
		photographerID: "photographerID",
		clientID: "clientid",
		review: "whatndafbiuysadb",
		stars: 4.5,
	},
	{
		photographerID: "photographerID",
		clientID: "clientid",
		review: "whatndafbiuysadb",
		stars: 4.5,
	},
]

function UserProfile() {

	var [user, setUser] = useState(0);
	var [isSignedIn, setIsSignedIn] = useState(false);

	const getUser = ()=>{
		// get user info from firebase authentication
		// verify if user exists
		// if user exists render profile page with user data
		// else go to sign in / up page
		console.log("hhdasjkdh");
		
	};

	useEffect(() => {
        // getUser();
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			console.log(user, isSignedIn)
			setUser(user);
			setIsSignedIn(!!user);
		});
		return () => unregisterAuthObserver();
    }, []);

	if (!isSignedIn)
		<Redirect to="/login" />

	return (
		<div>
			UserProfile
			{/* {user}
			{isSignedIn} */}
		</div>
	);
}

export default UserProfile