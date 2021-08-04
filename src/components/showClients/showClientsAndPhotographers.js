//rafce

import axios from 'axios';
import {useState, useEffect} from 'react'



const ShowClientsAndPhotographers = () => {
    const [Photographers, setPhotographers] = useState([])
    
    useEffect( ()=>{
        const getPhotographers = async ()=> {
          const photographersFromServer = await fetchPhotographers();
          setPhotographers(photographersFromServer)
        }
        getPhotographers()
    }, [])

    const fetchPhotographers = async () =>{
        const res = await fetch('http://localhost:4000/photographers')
        const data = await res.json()
        console.log (data);
        return data
    }

    return (
        <div>
            <table class="table table-striped">
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>email</th>
                    <th>Fees/hr</th>
                </tr>
                {Photographers.map(Photographer=> 
                    <tr>
                        <td>
                        {Photographer.name}
                        </td>
                        <td>
                        {Photographer.phone}
                        </td>
                        <td>
                        {Photographer.email}
                        </td>
                        <td>
                        {Photographer.fees}
                        </td>
                    </tr>
                )}
            </table> 
        </div>
        
    )
}



export default ShowClientsAndPhotographers