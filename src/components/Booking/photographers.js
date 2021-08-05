import { useState, useEffect } from 'react'
import Booking from "../Booking/Booking"



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
function bookingNow(id){
    console.log("Clicked" + id);
    <Booking PhotographerId={id} />
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
                                <button onClick={() => { bookingNow(Photographer._id)}}>Book This Photographer</button>
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