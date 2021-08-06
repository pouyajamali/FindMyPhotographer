import axios from 'axios';
import {useState, useEffect} from 'react';
import $ from 'jquery';
import * as ReactBootStrap from "react-bootstrap";
import firebase from "firebase";

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

	//Dummy: To be deleted
	// var dummy_photographer_user = {
	// 	_id: "1",
	// 	name: "pouya",
	// 	email: "pouya@gmail.com",
	// 	phone: "1234567890",
	// 	fees: "100$",
	// 	tags: [" weddings ", " cars "],
	// 	type: "photographer"
	// }
	
	// console.log("user in photographer profile",photographerInfo);

	// var dummy_photographer_bookings = [
	// 									{tags: [" cars "], _id: "1", title: "Honda Civic", description: "Honda Civic pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"},
	// 									{tags: [" cars "], _id: "2", title: "Mazda 3", description: "Mazda 3 pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"},
	// 									{tags: [" cars "], _id: "3", title: "Mazda 3", description: "Mazda 3 pics for sale", client: "1234567890", photographer: "$100", status: "pending", fee: "$100"}
	// 								]

	// var dummy_review = [
	// 					{author: "john", description:"I had an amazing experience with this great photographer"},
	// 					{author: "alex", description:"This guy is super talented!"}
	// ]
	/////////////////////////////////////////////////////////////////////////////
	
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
			<h2>Portfolio:</h2>
			<button className="btn btn-primary" onClick={()=>uploadImages()}>Upload Images</button><br/><br/>
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