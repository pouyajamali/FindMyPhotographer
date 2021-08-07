import {useState, useEffect} from 'react';

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

	var firebase_user = props.user;
	var email = firebase_user.email;
	var name =  firebase_user.displayName;

	/////////////////////////////////////////////////////////////////////////////
	
	// const { value:Name, bind:bindName, reset:resetName } = useInput('');
	// const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
	const { value:Phone, bind:bindPhone, reset:resetPhone} = useInput('');
	const { value:Fee, bind:bindFee, reset:resetFee} = useInput('');
    const { value:Tags, bind:bindTags, reset:resetTags} = useInput('');

    const [dropdown, setDropdown] = useState("photographer");

	const handleSubmit = (evt) => {
        var tmpTags = Tags.split(",")
		var new_user = {
			// _id: "1",
			name: name,
			email: email,
			phone: Phone,
			fees: Fee,
			tags: tmpTags,
			type: dropdown
		}
		evt.preventDefault();
		// alert(dummy_photographer_user);
		// resetName();
		// resetEmail();
		resetPhone();
		resetFee();
        resetTags();

		var url = process.env.REACT_APP_BACKEND_URL;
		console.log(new_user.type)
		if (new_user.type === "photographer")
			url += "/photographers/";
		else if (new_user.type === "client")
			url += "/clients/";

		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(new_user),
		})
		.then(res => {
			console.log('Response:', res);
			if (res.ok){
				alert(dropdown+" saved successfully");
				window.location.reload();
				// setPhotographerInfo(updated_photographer);	// if i dont want to reload whole page
			}
			else{
				alert(dropdown+" could not be saved");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	return (
		<div className="photographerProfile">
			<h2>Sign Up Information:</h2>
            <p>Please enter your sign up information here.</p>
			<div className="extraSignupInfo">
				<form onSubmit={handleSubmit}>
					<label>Name {name}</label><br/>
					<label>Email Address {email}</label><br/><br />
					<label >User Type</label><br />
                    <select  onChange={(e)=>{setDropdown(e.target.value)}} >
                        <option value="photographer">Photographer</option>
                        <option value="client">Client</option>
                    </select><br/>
					<label>Phone</label><br/>
					<input type="text" {...bindPhone} /><br/>
					<label>Fee</label><br/>
					<input type="text" {...bindFee} disabled={dropdown === "client" ? true : false} /><br/>
                    <label>Tags ex: [tag1,tag2] </label><br />
					<input type="text" {...bindTags} disabled={dropdown === "client" ? true : false}/>
                    <div>* This field is only required for the photographer account.</div><br/><br/>
					<input class="btn btn-primary" type="submit" value="Submit" />
                    
				</form>
			</div><br/><br/>
		</div>
	);
}
export default ExtraSignUpInfo

