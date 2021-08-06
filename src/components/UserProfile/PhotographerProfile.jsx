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

	// Dummy: To be deleted
	// var dummy_photographer_user = {
	// 	_id: "1",
	// 	name: "pouya",
	// 	email: "pouya@gmail.com",
	// 	phone: "1234567890",
	// 	fees: "100$",
	// 	tags: [" weddings ", " cars "],
	// 	type: "photographer"
	// }
	var dummy_photographer_user = props.user;

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
				<p>Photographer Tags: {dummy_photographer_user.tags}</p>
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
						{dummy_photographer_bookings.map(renderBookingsTable)}
					</tbody>
				</ReactBootStrap.Table>	
			</div><br/>
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
				</table>
			</div>
		</div>
	);
}
export default PhotographerProfile


// {
//     "personalInfo": {
//         "tags": [
//             "wedding",
//             "cars"
//         ],
//         "_id": "60f5b295c9554f57cd249d8b",
//         "name": "Dhrubo",
//         "email": "dhrubo@gmail.com",
//         "phone": 9999999999,
//         "fees": 50,
//         "__v": 0
//     },
//     "bookingInfo": [
//         {
//             "tags": [],
//             "_id": "6109d4bde7077153a4637081",
//             "title": "New Job",
//             "description": "Job Desc",
//             "client": "60f5b55130b4c2591034acc8",
//             "photographer": "60f5b295c9554f57cd249d8b",
//             "status": "Pending",
//             "client_offer": 20,
//             "__v": 0
//         },
//         {
//             "tags": [
//                 "cars"
//             ],
//             "_id": "6109d5a0e7077153a4637083",
//             "title": "New Job",
//             "description": "Job Desc",
//             "client": "60f5b55130b4c2591034acc8",
//             "photographer": "60f5b295c9554f57cd249d8b",
//             "status": "Pending",
//             "client_offer": 20,
//             "photographer_ask": 40,
//             "__v": 0
//         },
//         {
//             "tags": [
//                 "cars"
//             ],
//             "_id": "6109d6f7e7077153a4637087",
//             "title": "New Job",
//             "description": "Job Desc",
//             "client": "60f5b55130b4c2591034acc8",
//             "photographer": "60f5b295c9554f57cd249d8b",
//             "status": "Pending",
//             "client_offer": 20,
//             "photographer_ask": 40,
//             "__v": 0
//         },
//         {
//             "tags": [
//                 "cars",
//                 "weddings"
//             ],
//             "_id": "6109ebe97cb39b641835a322",
//             "title": "New JobBBBBBBBBBBB",
//             "description": "Job Desc",
//             "client": "60f5b55130b4c2591034acc8",
//             "status": "Pending",
//             "client_offer": 20,
//             "photographer": "60f5b295c9554f57cd249d8b",
//             "photographer_ask": 40,
//             "__v": 0
//         },
//         {
//             "tags": [
//                 "cars",
//                 "weddings"
//             ],
//             "_id": "6109f2e43696eb0a6c1dabf0",
//             "title": "Demo job",
//             "description": "Demo Job Desc",
//             "client": "60f5b55130b4c2591034acc8",
//             "status": "Pending",
//             "client_offer": 20,
//             "photographer": "60f5b295c9554f57cd249d8b",
//             "photographer_ask": 40,
//             "__v": 0
//         }
//     ]
// }

// import React, { Component } from 'react'

// class PhotographerProfile extends Component {
//    constructor(props) {
//       super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
//       this.state = { //state is by default an object
//          students: [
//             { id: 1, name: 'Wasif', age: 21, email: 'wasif@email.com' },
//             { id: 2, name: 'Ali', age: 19, email: 'ali@email.com' },
//             { id: 3, name: 'Saad', age: 16, email: 'saad@email.com' },
//             { id: 4, name: 'Asad', age: 25, email: 'asad@email.com' }
//          ]
//       }
//    }
//    renderBookingsTable() {
// 	return this.state.students.map((student, index) => {
// 	   const { id, name, age, email } = student //destructuring
// 	   return (
// 		  <tr key={id}>
// 			 <td>{id}</td>
// 			 <td>{name}</td>
// 			 <td>{age}</td>
// 			 <td>{email}</td>
// 		  </tr>
// 	   )
// 	})
//  }

//  render() {
// 	return (
// 	   <div>
// 		  <h1 id='title'>React Dynamic Table</h1>
// 		  <table id='students'>
// 			 <tbody>
// 				{this.renderBookingsTable()}
// 			 </tbody>
// 		  </table>
// 	   </div>
// 	)
//  }
// }
// export default PhotographerProfile