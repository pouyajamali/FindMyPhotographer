import axios from 'axios';
import {useState, useEffect} from 'react';

var dummy_photographer_user = {
	_id: "1",
	name: "pouya",
	email: "pouya@gmail.com",
	phone: "1234567890",
	fees: "$100",
	tags: ["wedding", "cars"],
	type: "photographer"
}

var dummy_client_user = {
	_id: "0",
	name: "kazi",
	email: "kazi@sfu.ca",
	phone: "0987654321",
	budget: "$150",
	type: "client"
}

function UserProfile() {

	var [user] = useState(0);

	const getUser = ()=>{
		// get user info from firebase authentication
		// verify if user exists
		// if user exists render profile page with user data
		// else go to sign in / up page
		
	};

	useEffect(() => {
        getUser();
    }, []);

	return (
		<div>
			UserProfile
		</div>
	);
}

export default UserProfile