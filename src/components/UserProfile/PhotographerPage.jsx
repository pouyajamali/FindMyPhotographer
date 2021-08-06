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

	let photographer = props.location? props.location.state : props.user;
	photographer = photographer.photographer;

	console.log("PhotographerPage stateData", photographer)
	
	var [isSignedIn, setIsSignedIn] = useState(false);


	var [reviews, setReviews] = useState([]);
	// var [portfolio, setPortfolio] = useState(0);

	const getUserData = async (id) => {//
        var url = process.env.REACT_APP_BACKEND_URL + '/profiles/photographer/' + id;
        const res = await fetch(url);
        const data = await res.json()
        console.log ("data",data);
        return data
    };

	useEffect(()=>{
		var data = getUserData(photographer._id).then((data)=>{
			console.log ("data",data);
			setReviews(data.reviewInfo);
		});
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			setIsSignedIn(!!user);
		});
		return ()=>unregisterAuthObserver();
	}, [])
	
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
			<h2>Photographer Panel:</h2>
			<div className="tableHolder">
                <div>
                    <h2>{photographer.name}</h2>
                    <h4>Email Address: {photographer.email}</h4>
                    <h4>Phone: {photographer.phone}</h4>
                    <h4>Booking Fee: {photographer.fees}</h4>
                    <h4>Tags: {photographer.tags}</h4>
                </div>
			</div><br/><br/>
			<h2>Portfolio:</h2><br/>
			<div className="imageContainer">
				<img src="./background_pic_1.jpg" className="imgPortfolio"/>
				<img src="./background_pic_2.jpg" className="imgPortfolio"/>
				<img src="./background_pic_3.jpg" className="imgPortfolio"/>
			</div>
			<h2>Reviews:</h2>
			<div>
				<br/>
				{reviews.length !== 0 ? 
				<table className="reviewHolder">
					<thead>
						<tr>
							<th>Author</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{reviews.map(renderReviewsTable)}
					</tbody>
				</table> : "No Reviews"}
			</div>
			<br/><br/>
			{isSignedIn ?
			<>	
			<h2>Add your reviews below.</h2>
			<div className="reviewHolder">
				<form onSubmit={handleSubmit}>
					<label>Author:</label><br/>
					<input type="text" placeholder="You name" {...bindName} className="reviewAuthor"/><br/><br/>
					<label>Review Body:</label><br/>
					<textarea placeholder="Your review goes here . . ." {...bindReview} className="reviewBox"></textarea>
					<input type="submit" value="Submit" />
				</form>
			</div>	
			</> : ""}
		</div>
	);
}
export default PhotographerPage
