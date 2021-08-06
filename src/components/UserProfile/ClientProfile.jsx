import axios from 'axios';
import {useState, useEffect} from 'react';
import $ from 'jquery';
import * as ReactBootStrap from "react-bootstrap";
import firebase from "firebase";
import "./UserStyles.css"
import updateBooking from './PhotographerProfile';
import CounterOfferInput from './PhotographerProfile'

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
		var data = getUserData(props.user._id)
			.then((data)=>{
				console.log ("data",data);
				setClientInfo(data.personalInfo);
				setBookings(data.bookingInfo);
				return data;
			})
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

	const handleCancelBooking = (e,booking_id) => {
		console.log("cancel booking",e,booking_id)
		// POST req to api to set status of booking to "Rejected", booking id: booking._id
		var updated_booking = {
			_id: booking_id,
			status: "Cancelled",
		};
		updateBooking(booking_id, updated_booking);
	};

	const { value:CounterOffer, bind:bindCounterOffer, reset:resetCounterOffer} = useInput('');
	const handleCounterOffer = (e, booking_id) => {
		console.log("Save Counter Offer",e, booking_id,CounterOffer)
		var updated_booking = {
			_id: booking_id,
			counter_offer: CounterOffer,
		}
		e.preventDefault();
		resetCounterOffer();
		// POST req to api to set counter_offer of booking to e.value, booking id: booking._id
		updateBooking(booking_id, updated_booking);
	};

	const renderBookingsTable = (booking, index) => {
		return(
			<tr key={index}>
				<td>{booking.photographer}{/* <Link to={{ pathname: '/photographerPage', state: { photographer: booking.photographer } }}>{booking.photographer.name}</Link> */}</td> 
				<td>{booking.title}</td>
				<td>{booking.description}</td>
				<td>{booking.status}</td>
				<td>{booking.client_offer}</td>
				<td><CounterOfferInput booking_id={booking._id}/></td>
				<td>{booking.status === "Pending" ? <button onClick={(e)=>handleCancelBooking(e,booking._id)}>Cancel</button> : ""} </td>
			</tr>
		)
	}

	return (
		<div className="photographerProfile">
			<h2>Client Panel: {clientInfo.name}</h2>
			<div className="tableHolder">
				<form onSubmit={handleSubmit}>
					<label>Email Address: {clientInfo.email}</label><br/>
					{/* <input type="text" placeholder={clientInfo.email} {...bindEmail} /><br/><br/> */}
					<label>Name:</label><br/>
					<input type="text" placeholder={clientInfo.name} {...bindName} /><br/><br/>
					<label>Phone:</label><br/>
					<input type="text" placeholder={clientInfo.phone} {...bindPhone} /><br/><br/>
					{/* <label>Current Tags: {clientInfo.tags}</label><br/>
					<input type="text" placeholder={clientInfo.fees} {...bindFee} /><br/><br/> */}
					<input type="submit" value="Update" />
				</form>
			</div><br/><br/>
			<h2>Bookings Panel:</h2>
			{bookings.length !== 0 ? 
			<div>
				<ReactBootStrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>Photographer Name</th>
							<th>Title</th>
							<th>Description</th>
							<th>Status</th>
							<th>Offer</th>
							<th>Counter Offer</th>
							<th></th>

						</tr>
					</thead>
					<tbody>
						{bookings.map(renderBookingsTable)}
					</tbody>
				</ReactBootStrap.Table>	
			</div> : "No Bookings"}
			<br/>
		</div>
	);
}
export default ClientProfile
