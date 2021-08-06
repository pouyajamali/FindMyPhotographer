import axios from 'axios';
import {useState, useEffect} from 'react';
import $ from 'jquery';
import * as ReactBootStrap from "react-bootstrap";
import firebase from "firebase";
import "./UserStyles.css"


export const useInput = initialValue => {
	const [value, setValue] = useState(initialValue);

	return {
	  value,
	  setValue,
	  reset: () => setValue(""),
	  bind: {
		value,
		onChange: event => {
		  setValue(event.target.value);
		}
	  }
	};
  };

function ExtraSignUpInfo(props) {

	//Dummy: To be deleted
	var dummy_photographer_user = {
		_id: "1",
		name: "pouya",
		email: "pouya@gmail.com",
		phone: "1234567890",
		fees: "100$",
		tags: [" weddings ", " cars "],
		type: "photographer"
	}
	// var dummy_photographer_user = props.user; TODO

	/////////////////////////////////////////////////////////////////////////////
	
	const { value:Name, bind:bindName, reset:resetName } = useInput('');
	const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
	const { value:Phone, bind:bindPhone, reset:resetPhone} = useInput('');
	const { value:Fee, bind:bindFee, reset:resetFee} = useInput('');
    const { value:Tags, bind:bindTags, reset:resetTags} = useInput('');

    const [dropdown, setDropdown] = useState("photographer");

	const handleSubmit = (evt) => {
        var tmpTags = Tags.split(",")
		dummy_photographer_user = {
			_id: "1",
			name: Name,
			email: Email,
			phone: Phone,
			fees: Fee,
			tags: tmpTags,
			type: dropdown
		}
		evt.preventDefault();
		alert(dummy_photographer_user);
		resetName();
		resetEmail();
		resetPhone();
        resetTags();
	}


	const renderBookingsTable = (booking, index) => {
		return(
			<tr key={index}>
				<td>{booking._id}</td>
				<td>{booking.title}</td>
				<td>{booking.status}</td>
				<td>{booking.fee}</td>
			</tr>
		)
	}

	const renderReviewsTable = (review, index) => {
		return(
			<tr key={index}>
				<td>{review.author + ":"}</td>
				<td>{review.description}</td>
			</tr>

		)
	}

	return (
		<div className="photographerProfile">
			<h2>Sign Up Information:</h2>
            <p>Please enter your sign up information here.</p>
			<div className="extraSignupInfo">
				<form onSubmit={handleSubmit}>
					<label>Name:</label><br/>
					<input type="text" placeholder={dummy_photographer_user.name} {...bindName} /><br/><br/>
					<label>Email Address:</label><br/>
					<input type="text" placeholder={dummy_photographer_user.email} {...bindEmail} /><br/><br/>
					<label>Phone:</label><br/>
					<input type="text" placeholder={dummy_photographer_user.phone} {...bindPhone} /><br/><br/>
					<label>Fee:</label><br/>
					<input type="text" placeholder={dummy_photographer_user.fees} {...bindFee} /><br/><br/>
					{/* <label>Current Tags: {dummy_photographer_user.tags}</label><br/>
					<input type="text" placeholder={dummy_photographer_user.fees} {...bindFee} /><br/><br/> */}
                    <div>Please select the type of user account</div>
                    <select value={dropdown} onChange={(e)=>{setDropdown(e.target.value)}}>
                        <option value="photographer">Photographer</option>
                        <option value="client">Client</option>
                    </select><br/><br/>
                    <label>Please type in the types of provided services seperated by coma.</label><br/>
					<input type="text" placeholder={dummy_photographer_user.tags} {...bindTags} disabled={dropdown === "client" ? true : false}/>
                    <div>* This field is only required for the photographer account.</div><br/><br/>
					<input type="submit" value="Submit" />
                    
				</form>
			</div><br/><br/>
		</div>
	);
}
export default ExtraSignUpInfo


// import {  useState, useEffect } from 'react';

// function ExtraSignUpInfo (props){


//     return(
//         <div>
//             extra
//         </div>
//     );
// }

// export default ExtraSignUpInfo;
