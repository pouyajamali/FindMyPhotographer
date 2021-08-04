import axios from 'axios';
import {useState, useEffect} from 'react';
import $ from 'jquery';

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

function UserProfile(props) {

		//Dummy: To be deleted
		var dummy_photographer_user = {
			_id: "1",
			name: "pouya",
			email: "pouya@gmail.com",
			phone: "1234567890",
			fees: "$100",
			tags: [" weddings ", " cars "],
			type: "photographer"
		}

		const { value:Name, bind:bindName, reset:resetName } = useInput('');
		const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
		const { value:Phone, bind:bindPhone, reset:resetPhone} = useInput('');
		const { value:Fee, bind:bindFee, reset:resetFee} = useInput('');

		const handleSubmit = (evt) => {
			var dummy_photographer_user = {
				_id: "1",
				name: Name,
				email: Email,
				phone: Phone,
				fees: Fee,
				tags: [" weddings ", " cars "],
				type: "photographer"
			}
			evt.preventDefault();
			alert(dummy_photographer_user.name);
			resetName();
			resetEmail();
			resetPhone();
		}

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
		  <form onSubmit={handleSubmit}>
			<label>Name:</label><br/>
			<input type="text" placeholder={dummy_photographer_user.name} {...bindName} /><br/><br/>
			<label>Email Address:</label><br/>
			<input type="text" placeholder={dummy_photographer_user.email} {...bindEmail} /><br/><br/>
			<label>Phone:</label><br/>
			<input type="text" placeholder={dummy_photographer_user.phone} {...bindPhone} /><br/><br/>
			<label>Fee:</label><br/>
			<input type="text" placeholder={dummy_photographer_user.fees} {...bindFee} /><br/><br/>
			<input type="submit" value="Update" />
		  </form>
		);
	  }
export default UserProfile