
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

export const Booking = () => {
    var [title, setTitle] = useState()
    var [description, setDescription] = useState()
    var [name, setName] = useState()
    var [Photographer, setPhotographer] = useState()
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
    const photographerUpdate = (event) => {
        setPhotographer(event.target.value)
    }
    const statusUpdate = (event) => {
        setPhotographer(event.target.value)
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
                name: name,

            })
        })
            .then(() => {
                // Once posted, the user will be notified 
                alert('You have been added to the system!');
            })
    }

    // myChangeHandler = (event) => {
    //     this.setState({ username: event.target.value });
    // }
    // render() {
    return (
        <form onSubmit={handleSubmit}>
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
            <p>Client:</p>
            <input
                type='text'
                required onChange="60f5b55130b4c2591034acc8"
            />
            <p>Photographer:</p>
            <input
                type='text'
                required onChange="60f5b55130b4c2591034acc8"
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
            <button type="submit">Submit</button>
        </form>

    );
}
// }
//}

export default Booking