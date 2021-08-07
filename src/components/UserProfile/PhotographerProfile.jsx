import {useState, useEffect} from 'react';
import * as ReactBootStrap from "react-bootstrap";
import "./UserStyles.css"
import Portfolio from './Portfolio'

export const updateBooking = (booking_id, updated_booking) => {
	var url = process.env.REACT_APP_BACKEND_URL + "/bookings/" + booking_id;
	fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(updated_booking),
	})
	.then(res => {
		console.log('Response:', res);
		if (res.ok){
			alert("Booking updated successfully");
			window.location.reload();
		}
		else{
			alert("Booking could not be updated");
		}
	})
	.catch((error) => {
		console.error('Error:', error);
	});
};

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

export const CounterOfferInput = (props) => {
	const handleKeyDown = (event) => {
	  if (event.key === 'Enter') {
		var value = parseFloat(event.target.value);
		var booking_id = props.booking._id
		var updated_booking = {
			_id: booking_id,
			counter_offer: value,
		}
		console.log('do validate',event, updated_booking)
		updateBooking(booking_id, updated_booking);
	  }
	}
  
	return <input placeholder={props.booking.counter_offer ? props.booking.counter_offer : ""} style={{width:"100%"}} type="text" onKeyDown={e=>handleKeyDown(e)} />
}

function PhotographerProfile(props) {
	
	var [photographerInfo, setPhotographerInfo] = useState(0);
	var [bookings, setBookings] = useState([]);
	var [reviews, setReviews] = useState([]);
	var [portfolio, setPortfolio] = useState(0);

	const getUserData = async (id) => {
        var url = process.env.REACT_APP_BACKEND_URL + '/profiles/photographer/' + id;
        const res = await fetch(url);
        const data = await res.json()
        console.log ("data",data);
        return data
    };

	useEffect(()=>{
		console.log("props.user",props.user)
		var data = getUserData(props.user._id).then((data)=>{
			console.log ("data",data);
			setPhotographerInfo(data.personalInfo);
			setBookings(data.bookingInfo);
			setReviews(data.reviewInfo);
		});
	}, [])
	
	const { value:Name, bind:bindName, reset:resetName } = useInput('');
	const { value:Phone, bind:bindPhone, reset:resetPhone} = useInput('');
	const { value:Fee, bind:bindFee, reset:resetFee} = useInput('');

	const handleSubmit = (evt) => {
		var updated_photographer = {
			name: Name ? Name : photographerInfo.name,
			phone: Phone ? Phone : photographerInfo.phone,
			fees: Fee ? Fee : photographerInfo.fees,
			tags: photographerInfo.tags,
			type: "photographer"
		}
		evt.preventDefault();
		resetName();
		resetPhone();
		resetFee();

		var url = process.env.REACT_APP_BACKEND_URL + "/photographers/" + props.user._id;
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(updated_photographer),
		})
		.then(res => {
			console.log('Response:', res);
			if (res.ok){
				alert("Photographer updated successfully");
				window.location.reload();
			}
			else{
				alert("Photographer could not be updated");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
	}

	const handleAcceptBooking = (e,booking_id) => {
		console.log("accept booking",booking_id)
		// POST req to api to set status of booking to "Accepted", booking id: booking._id
		var updated_booking = {
			_id: booking_id,
			status: "Accepted",
		}
		updateBooking(booking_id, updated_booking);
	};

	const handleRejectBooking = (e,booking_id) => {
		console.log("Reject booking",booking_id)
		// POST req to api to set status of booking to "Rejected", booking id: booking._id
		var updated_booking = {
			_id: booking_id,
			status: "Rejected",
		};
		updateBooking(booking_id, updated_booking);

	};

	const renderBookingsTable = (booking, index) => {
		return(
			<tr key={index}>
				<td>{booking.client.name}</td>
				<td>{booking.title}</td>
				<td>{booking.description}</td>
				<td>{booking.status}</td>
				<td>{booking.client_offer}</td>
				<td><CounterOfferInput booking={booking}/></td>
				<td>{booking.status === "Pending" ? <button onClick={(e)=>handleAcceptBooking(e,booking._id)}>Accept</button> : ""} </td>
				<td>{booking.status === "Pending" ? <button onClick={(e)=>handleRejectBooking(e,booking._id)}>Reject</button> : ""} </td>
			</tr>
		)
	}

	const renderReviewsTable = (review, index) => {
		return(
			<tr key={index}>
				<td>{review.clientName}</td>
				<td>{review.stars}</td>
				<td>{review.review}</td>
			</tr>

		)
	}
	
	return (
		<div className="photographerProfile">

			<h2>Photographer Panel: {photographerInfo.name}</h2>
			<div className="formHolder">
				<form onSubmit={handleSubmit}>
					<p>Photographer Tags: {photographerInfo.tags ? photographerInfo.tags.toString() : ""}</p>
					<label>Name:</label><br/>
					<input type="text" placeholder={photographerInfo.name} {...bindName} /><br/><br/>
					{/* <label>Email Address:</label><br/>
					<input type="text" placeholder={photographerInfo.email} {...bindEmail} /><br/><br/> */}
					<label>Phone:</label><br/>
					<input type="text" placeholder={photographerInfo.phone} {...bindPhone} /><br/><br/>
					<label>Fee:</label><br/>
					<input type="text" placeholder={photographerInfo.fees} {...bindFee} /><br/><br/>
					{/* <label>Current Tags: {photographerInfo.tags}</label><br/>
					<input type="text" placeholder={photographerInfo.fees} {...bindFee} /><br/><br/> */}
					<input type="submit" value="Update" />
				</form>
			</div><br/><br/>

			<h2>Bookings Panel:</h2>
			{bookings.length !== 0 ? 
			<div>
				<ReactBootStrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>Client Name</th>
							<th>Title</th>
							<th>Description</th>
							<th>Status</th>
							<th>Client Offer</th>
							<th>Counter Offer</th>
							<th></th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{bookings.map(renderBookingsTable)}
					</tbody>
				</ReactBootStrap.Table>	
			</div> : "No Bookings"}<br/>
			
			<Portfolio photographer_id={photographerInfo._id}/>

			<br />
			<h2>Reviews:</h2>
			<div>
				{reviews.length !== 0 ? 
				<table className="reviewHolder">
					<thead>
						<tr>
							<th>Author</th>
							<th>Stars</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{reviews.map(renderReviewsTable)}
					</tbody>
				</table> : "No Reviews"}
			</div>
		</div>
	);
}
export default PhotographerProfile
