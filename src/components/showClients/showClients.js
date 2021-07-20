//rafce

import axios from 'axios';
import {useState} from 'react'
import { useEffect } from 'react';


const ShowClients = () => {
    var [clients, setclients] = useState(0);
    // const ClientBtnClick = async (e)=>{
    //     const response = await axios.get("http://localhost:4000/clients")
    //     all_clients = response.data;
    //     console.log(all_clients)
    // }
    var all_clients = []
    const ClientBtnClick = (e)=>{
        var response = axios.get("http://localhost:4000/clients").then((response)=>{
            // clients = response.data;
            all_clients = response.data;
            console.log(all_clients);
            // setclients(response.data);
            // console.log(clients);
        })
    }
    
        
    
    // useEffect(() => {
    //     // setTimeout(() => {
    //     //   setLang("spanish");
    //     // }, 3000);
    //     setclients(all_clients);
    // }, [all_clients]);
    return (
        <div>
            <button 
            onClick = {ClientBtnClick}
            // style = {{backgroundColor: props.color}} 
            // className= 'btn'
            >
            {/* {props.text} */}
            Console Log All Clients
            </button>
            <div>
                Clients: {clients}
                
                {/* Clients: {clients.map(client => <div>{client.name}</div>)} */}

            </div>

        </div>
        
    )
}



export default ShowClients