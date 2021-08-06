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

function PhotographerProfile(props) {
	
	// var dummy_photographer_user = props.user;
	var [photographerInfo, setPhotographerInfo] = useState(0);
	var [bookings, setBookings] = useState([]);
	var [reviews, setReviews] = useState([]);
	var [portfolio, setPortfolio] = useState(0);


	const getUserData = async (id) => {//
        // window.location.reload()

        var url = process.env.REACT_APP_BACKEND_URL + '/profiles/photographer/' + id;
        const res = await fetch(url);
        const data = await res.json()
        console.log ("data",data);
        return data
    };

	useEffect(()=>{
		var data = getUserData(props.user._id).then((data)=>{
			console.log ("data",data);
			setPhotographerInfo(data.personalInfo);
			setBookings(data.bookingInfo);
			setReviews(data.reviewInfo);
		});
	}, [])
	
	const { value:Name, bind:bindName, reset:resetName } = useInput('');
	const { value:Email, bind:bindEmail, reset:resetEmail } = useInput('');
	const { value:Phone, bind:bindPhone, reset:resetPhone} = useInput('');
	const { value:Fee, bind:bindFee, reset:resetFee} = useInput('');

	const handleSubmit = (evt) => {
		var updated_photographer = {
			name: Name ? Name : photographerInfo.name,
			// email: Email,
			phone: Phone ? Phone : photographerInfo.phone,
			fees: Fee ? Fee : photographerInfo.fees,
			tags: photographerInfo.tags,
			type: "photographer"
		}
		evt.preventDefault();
		resetName();
		resetEmail();
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
				// setPhotographerInfo(updated_photographer);	// if i dont want to reload whole page
			}
			else{
				alert("Photographer could not be updated");
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
				<td>{booking.client_offer}</td>
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

	const uploadImages = () => {
		console.log("upload images")
	}

	return (
		<div className="photographerProfile">
			<h2>Photographer Panel: {photographerInfo.name}</h2>
			<div className="tableHolder">
				<p>Photographer Tags: {photographerInfo.tags ? photographerInfo.tags.toString() : ""}</p>
				<form onSubmit={handleSubmit}>
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
			<div>
				<ReactBootStrap.Table striped bordered hover>
					<thead>
						<tr>
							<th>ID</th>
							<th>Title</th>
							<th>Status</th>
							<th>Client Offer</th>
						</tr>
					</thead>
					<tbody>
						{bookings.map(renderBookingsTable)}
					</tbody>
				</ReactBootStrap.Table>	
			</div><br/>
			<h2>Portfolio:</h2><br/>
			<div className="imageContainer">
				<img src="./background_pic_1.jpg" className="imgPortfolio"/>
				<img src="./background_pic_2.jpg" className="imgPortfolio"/>
				<img src="./background_pic_3.jpg" className="imgPortfolio"/>
			</div>
			<h2>Reviews:</h2>
			<div>
				<br/>
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
				</table>
			</div>
		</div>
	);
}
export default PhotographerProfile
