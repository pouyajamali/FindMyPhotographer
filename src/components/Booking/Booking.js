
import React, { useState } from 'react';

// class Bookings extends React.Component {
// componentDidMount() {
//     // Simple POST request with a JSON body using fetch
//     const requestOptions = {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ title: 'React POST Request Example' })
//     };
//     fetch(process.env.REACT_APP_BACKEND_URL + "/Bookings", requestOptions)
//         .then(response => response.json())
//         .then(data => this.setState({ postId: data.id }));
// }

// constructor(props) {
//     super(props);
//     this.state = { username: '' };
// }

export const Booking = (props) => {
    var [title, setTitle] = useState()
    var [description, setDescription] = useState()
    var [name, setName] = useState()
    var [status, setStatus] = useState()
    var [offer, setOffer] = useState()
    var photographer= props.id;

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
        const postURL = process.env.REACT_APP_BACKEND_URL + "/Bookings" //Our previously set up route in the backend
        fetch(postURL, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title,
                description,
                client: "60f5b55130b4c2591034acc8",
                photographer: "60f5b55130b4c2591034acc8",
                status,
                client_offer: offer
            })
        })
            .then(() => {
                // Once posted, the user will be notified 
                alert('You have been added to the system!');
            }).catch((err) => {
                console.log(err);
            })
    }

    // myChangeHandler = (event) => {
    //     this.setState({ username: event.target.value });
    // }
    // render() {
    return (
        <div>
            <p>{props.photographerid}</p>
            <h1>Booking application</h1>
            <p>Project name:</p>
            <input
                type='text'
                required onChange={titleUpdate}

            />
            <p>Briefly describe your project:</p>
            <input
                type='text'
                required onChange={descriptionUpdate}
            />
            <p>Status:</p>
            <input
                type='text'
                required onChange={statusUpdate}
            />
            <p>Offering price:</p>
            <input
                type='text'
                required onChange={offerUpdate}
            />
            <button type="submit" onClick={handleSubmit}>Submit</button>
        </div>

    );
}
// }
//}

export default Booking