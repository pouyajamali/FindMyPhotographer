import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

// export let pid = 1234
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
        var url = process.env.REACT_APP_BACKEND_URL + "/photographers";
        const res = await fetch(url)
        const data = await res.json()
        console.log(data);
        return data
    }



    // function bookingNow(id){
    //     console.log("Clicked" + id);
    //     pid = id;
    //     // return(
    //     //     </>
    //             <Booking />
    //         //     <PhotographerPage/>
    //         // </>
    //     // );
    // }

    return (
        <div>
            <table className="table" striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>email</th>
                            <th>Fees/hr</th>
                        </tr>
                    </thead>
                <tbody>
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
                                <Link to={{
                                    pathname: '/book',
                                    // search: "?sort=name",
                                    // hash: "#the-hash",
                                    state: { photographer: Photographer }
                                }}>
                                    {/* <button onClick={() => { bookingNow(Photographer._id) }}>Book This Photographer</button> */}
                                    Book This Photographer
                                </Link>
                            </td>
                            <td>
                                <Link to={{
                                    pathname: '/photographerPage',
                                    // search: "?sort=name",
                                    // hash: "#the-hash",
                                    state: { photographer: Photographer }
                                }}>
                                    Show Profile
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

    )
}


export default ShowPhotographers