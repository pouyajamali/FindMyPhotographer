import React, { useEffect, useState } from 'react';
import firebase from "firebase";
import SignInScreen from '../SignInUp/Firebase';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import PhotographerPage from '../UserProfile/PhotographerPage';
import '../Booking/Booking.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';

export const Booking = (props) => {

    /* check if user isSignedIn, then get user data */
    var [firebaseUser, setfirebaseUser] = useState(0);
    let photographer = props.location.state;
    console.log(photographer)

    var [isSignedIn, setIsSignedIn] = useState(false);
    var [userData, setUserData] = useState(0)

    useEffect(() => {
        const unregisterAuthObserver = firebase.auth().onAuthStateChanged(user => {
            setIsSignedIn(!!user);
        });
        return () => unregisterAuthObserver();
    }, []);

    const getUserData = async (user) => {//
        // window.location.reload()
        // var userDataFirebase = user.providerData[0]
        // console.log("userDataFirebase",userDataFirebase)
        var url = process.env.REACT_APP_BACKEND_URL + '/getInfoFromEmail/' + user.email;
        const res = await fetch(url);
        const data = await res.json();
        // console.log ("data",data);
        return data
    };

    useEffect(() => {
        let currentUser = firebase.auth().currentUser;
        setfirebaseUser(currentUser);
        console.log("hkhjjh", currentUser)
        if (currentUser !== null) {
            var data = getUserData(currentUser).then((data) => {
                // console.log ("data",data);
                setUserData(data);
                // console.log("useEffect", user, userData);
            });
        }
    }, [isSignedIn]);
    /* isSignedIn, userData, photographer ready to be user for booking */

    var [title, setTitle] = useState()
    var [description, setDescription] = useState()
    var [name, setName] = useState()
    var [status, setStatus] = useState()
    var [offer, setOffer] = useState()

    const titleUpdate = (event) => {
        setTitle(event.target.value)
    }
    const descriptionUpdate = (event) => {
        setDescription(event.target.value)
    }
    const clientUpdate = (event) => {
        setName(event.target.value)
    }

    const statusUpdate = (event) => {
        setStatus(event.target.value)
    }
    const offerUpdate = (event) => {
        setOffer(event.target.value)
    }

    const handleSubmit = () => { // Once the form has been submitted, this function will post to the backend
        var new_booking = {
            title,
            description,
            client: userData.value[0]._id,
            photographer: photographer.photographer._id,
            status: "Pending",
            client_offer: offer
        }

        const postURL = process.env.REACT_APP_BACKEND_URL + "/Bookings" //Our previously set up route in the backend
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(new_booking)
        })
            .then(() => {
                // Once posted, the user will be notified 
                alert('Booking has been requested to photographer. Wait for response from photographere...');
                window.location.replace("/")
            })
            .catch((err) => {
                console.log(err);
            })
    }

    console.log(isSignedIn, photographer, userData)

    if (isSignedIn && photographer && userData) {
        return (
            <div>
                <div>
                    <h1>Booking application </h1>
                    <p><b>{userData.value[0].name}</b> sending booking request to <b>{photographer.photographer.name}</b></p>
                    <Container>
                        <Form>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Project name: </Form.Label>
                                <Form.Control type='text' required onChange={titleUpdate} /> <br />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formProject">
                                <Form.Label>Briefly describe your project: </Form.Label>
                                <Form.Control type='text' required onChange={descriptionUpdate} /><br />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formOffer">
                                <Form.Label>Offering price: </Form.Label>
                                <Form.Control type='text' required onChange={offerUpdate} /><br />
                            </Form.Group>
                            <Button type="submit" onClick={handleSubmit}>Submit</Button>
                        </Form>
                    </Container>
                </div>
                <PhotographerPage user={photographer} />
            </div>

        );
    }
    else if (isSignedIn && !photographer) {
        window.location.replace("/photographers");
    }
    else {
        return (<SignInScreen />);
    }

}


export default Booking
