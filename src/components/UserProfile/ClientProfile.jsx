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

function ClientProfile(props) {

	// Dummy: To be deleted
	// var dummy_photographer_user = {
	// 	_id: "1",
	// 	name: "pouya",
	// 	email: "pouya@gmail.com",
	// 	phone: "1234567890",
	// 	type: "client"
	// }
	// var dummy_photographer_user = props.user;

	// var dummy_client_bookings = [
	// 									{tags: [" cars "], _id: "1", title: "Honda Civic", description: "Honda Civic pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"},
	// 									{tags: [" cars "], _id: "2", title: "Mazda 3", description: "Mazda 3 pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"},
	// 									{tags: [" cars "], _id: "3", title: "Mazda 3", description: "Mazda 3 pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"}
	// 								]

	/////////////////////////////////////////////////////////////////////////////

	var [clientInfo, setClientInfo] = useState(0);
	var [bookings, setBookings] = useState([]);

	const getUserData = async (id) => {//
        // window.location.reload()

        var url = process.env.REACT_APP_BACKEND_URL + '/profiles/client/' + id;
        const res = await fetch(url);
        const data = await res.json();
        console.log ("data",data);
        return data;
    };

	useEffect(()=>{
		var data = getUserData(props.user._id).then((data)=>{
			console.log ("data",data);
			setClientInfo(data.personalInfo);
			setBookings(data.bookingInfo);
		});
	}, [])
	
	const { value:Name, bind:bindName, reset:resetName } = useInput('');
	const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
	const { value:Phone, bind:bindPhone, reset:resetPhone} = useInput('');
	const { value:Fee, bind:bindFee, reset:resetFee} = useInput('');

	const handleSubmit = (evt) => {
		var updated_client = {
			name: Name ? Name : clientInfo.name,
			phone: Phone ? Phone : clientInfo.phone,
			type: "client"
		}
		evt.preventDefault();
		// alert(dummy_photographer_user.name);
		resetName();
		resetPhone();

		var url = process.env.REACT_APP_BACKEND_URL + "/clients/" + props.user._id;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updated_client),
		})
		.then(res => {
			console.log('Response:', res);
			if (res.ok){
				alert("Client updated successfully");
				window.location.reload();
				// setPhotographerInfo(updated_photographer);	// if i dont want to reload whole page
			}
			else{
				alert("Client could not be updated");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
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

	return (
		<div className="photographerProfile">
			<h2>Client Panel:</h2>
			<div className="tableHolder">
				<form onSubmit={handleSubmit}>
					<label>Name:</label><br/>
					<input type="text" placeholder={clientInfo.name} {...bindName} /><br/><br/>
					{/* <label>Email Address:</label><br/>
					<input type="text" placeholder={clientInfo.email} {...bindEmail} /><br/><br/> */}
					<label>Phone:</label><br/>
					<input type="text" placeholder={clientInfo.phone} {...bindPhone} /><br/><br/>
					{/* <label>Current Tags: {clientInfo.tags}</label><br/>
					<input type="text" placeholder={clientInfo.fees} {...bindFee} /><br/><br/> */}
					<input type="submit" value="Update" />
				</form>
			</div><br/><br/>
			<h2>Bookings Panel:</h2>
			<div>
				<ReactBootStrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Status</th>
							<th>Fee</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map(renderBookingsTable)}
					</tbody>
				</ReactBootStrap.Table>	
			</div><br/>
		</div>
	);
}
export default ClientProfile
