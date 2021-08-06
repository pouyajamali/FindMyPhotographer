import { useState, useEffect } from 'react'
import Booking from "../Booking/Booking"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

// var temp = 123;
// export {temp};
export let temp = 1234
const ShowPhotographers = () => {
    const [Photographers, setPhotographers] = useState([])

    useEffect(() => {
        const getPhotographers = async () => {
            const photographersFromServer = await fetchPhotographers();
            setPhotographers(photographersFromServer)
        }
        getPhotographers()
    }, [])

    const fetchPhotographers = async () => {
        const res = await fetch('http://localhost:4000/photographers')
        const data = await res.json()
        console.log(data);
        return data
    }
    // var temp = null;
    //export const sentId = temp

function bookingNow(id){
    console.log("Clicked" + id);
    // <Booking PhotographerId={id} />
    temp = id;
    <Booking />
    

    // alert(temp);
}
    return (
        <div>
            <table className="table">
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>Phone</th>
                        <th>email</th>
                        <th>Fees/hr</th>
                    </tr>
                    {Photographers.map(Photographer => (
                        <tr key={Photographer._id} id={Photographer._id} >
                            <td >
                                {Photographer.name}
                            </td>
                            <td >
                                {Photographer.phone}
                            </td>
                            <td >
                                {Photographer.email}
                            </td>
                            <td >
                                {Photographer.fees}
                            </td>
                            <td>
                                <Link to='/book'>
                                    <button onClick={() => { bookingNow(Photographer._id) }}>Book This Photographer</button>
                                </Link>
                            </td>
                            <td>

                                <a href="/" >Show Profile</a>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}


export default ShowPhotographers