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

function PhotographerPage(props) {

	// Dummy: To be deleted
	var dummy_photographer_user = {
		_id: "1",
		name: "Pooya Jamali",
		email: "pouya@gmail.com",
		phone: "1234567890",
		fees: "100$",
		tags: [" weddings ", " cars "],
		type: "photographer"
	}
	// var dummy_photographer_user = props.user;

	var dummy_photographer_bookings = [
										{tags: [" cars "], _id: "1", title: "Honda Civic", description: "Honda Civic pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"},
										{tags: [" cars "], _id: "2", title: "Mazda 3", description: "Mazda 3 pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"},
										{tags: [" cars "], _id: "3", title: "Mazda 3", description: "Mazda 3 pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"}
									]

	var dummy_review = [
						{author: "john", description:"I had an amazing experience with this great photographer"},
						{author: "alex", description:"This guy is super talented!"}
	]
	/////////////////////////////////////////////////////////////////////////////
	
	const { value:Name, bind:bindName, reset:resetName } = useInput('');
	const { value:Review, bind:bindReview, reset:resetReview } = useInput('');


	const handleSubmit = (evt) => {
		var user_review = {
			_id: "1",
			review: Review,
		}
		evt.preventDefault();
		resetName();
		resetReview();
		return user_review;
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
			<h2>Photographer Panel:</h2>
			<div className="tableHolder">
                <div>
                    <h2>{dummy_photographer_user.name}</h2>
                    <h4>Email Address: {dummy_photographer_user.email}</h4>
                    <h4>Phone: {dummy_photographer_user.phone}</h4>
                    <h4>Booking Fee: {dummy_photographer_user.fees}</h4>
                    <h4>Tags: {dummy_photographer_user.tags}</h4>
                </div>
			</div><br/><br/>
			<h2>Portfolio:</h2><br/>
			<h2>Reviews:</h2>
			<div>
				<br/>
				<table className="reviewHolder">
					<thead>
						<tr>
							<th>Author</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{dummy_review.map(renderReviewsTable)}
					</tbody>
				</table><br/><br/>
                <div className="reviewHolder">
                    <form onSubmit={handleSubmit}>
						<h6>Add your reviews below.</h6>
                    	<label>Author:</label><br/>
                        <input type="text" placeholder="You name" {...bindName} className="reviewAuthor"/><br/><br/>
                        <label>Review Body:</label><br/>
                        <textarea placeholder="Your review goes here . . ." {...bindReview} className="reviewBox"></textarea>
						<input type="submit" value="Submit" />
                    </form>
                </div>
			</div>
		</div>
	);
}
export default PhotographerPage
