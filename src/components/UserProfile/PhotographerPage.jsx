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
	var [user, setUser] = useState(0);
    var [userData, setUserData] = useState(0);

	var [reviews, setReviews] = useState([]);
	// var [portfolio, setPortfolio] = useState(0);

	const getPhotographerReviews = async (id) => {//
        var url = process.env.REACT_APP_BACKEND_URL + '/profiles/photographer/' + id;
        const res = await fetch(url);
        const data = await res.json()
        console.log ("data",data);
        return data
    };
	
	const getUserData = async (user) => {
        var url = process.env.REACT_APP_BACKEND_URL + '/getInfoFromEmail/' + user.email;
        const res = await fetch(url);
        const data = await res.json()
        return data
    };

	useEffect(()=>{
		var data = getPhotographerReviews(photographer._id).then((data)=>{
			console.log ("data",data);
			setReviews(data.reviewInfo);
		});
		const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
			setIsSignedIn(!!user);
		});
		return ()=>unregisterAuthObserver();
	}, [])

	useEffect(() => {
        let currentUser = firebase.auth().currentUser;
        setUser(currentUser);
        if (currentUser !== null){
			console.log("called getUserData")
            var data = getUserData(currentUser).then((data)=>{
				console.log ("called getUserData",data);
                setUserData(data);
            });
        }
    },[isSignedIn]);

	var [isSameID, setIsSameID] = useState(0);
	useEffect(() => {
		if (userData.value)
			setIsSameID(userData.value[0]._id === photographer._id);
	},[userData]);
	
	const { value:Stars, bind:bindStars, reset:resetStars } = useInput('');
	const { value:Review, bind:bindReview, reset:resetReview } = useInput('');


	const handleSubmit = (evt) => {
		var review = {
			client: userData.value[0]._id,
			clientName: userData.value[0].name,
			photographer: photographer._id,
			stars: Stars,
			review: Review,
		}
		evt.preventDefault();
		resetStars();
		resetReview();
		// return review;

		var url = process.env.REACT_APP_BACKEND_URL + "/reviews/";
		fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(review),
		})
		.then(res => {
			console.log('Response:', res);
			if (res.ok){
				alert("Review saved successfully");
				window.location.reload();
				// setPhotographerInfo(updated_photographer);	// if i dont want to reload whole page
			}
			else{
				alert("Review could not be saved");
			}
		})
		.catch((error) => {
			console.error('Error:', error);
		});
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

	// console.log(userData.value[0]._id, photographer._id)

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
							<th>Stars</th>
							<th>Description</th>
						</tr>
					</thead>
					<tbody>
						{reviews.map(renderReviewsTable)}
					</tbody>
				</table> : "No Reviews"}
			</div>
			<br/><br/>
			{isSignedIn && !isSameID?
			<>	
			<h2>Add your reviews below.</h2>
			<div className="reviewHolder">
				<form onSubmit={handleSubmit}>
					<label>Stars:</label><br/>
					<input min={0} max={5} type="number" placeholder="" {...bindStars} className="reviewAuthor"/>/5<br/><br/>
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
