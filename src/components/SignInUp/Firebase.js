// import firebase from "firebase/app";
// import firebase from "firebase/auth";
import firebase from "firebase";
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
};

// const app = firebase.initializeApp(config);
firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	// signInSuccessUrl: '/userProfile',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID
	],
	callbacks: {
		signInSuccessWithAuthResult: () => false
	},
};

function SignInScreen() {
	return (
		<div>
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		</div>
	);
}

export default SignInScreen

// export const auth = app.auth();
// export default app;