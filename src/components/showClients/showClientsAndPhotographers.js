//rafce

import axios from 'axios';
import {useState} from 'react'
import { useEffect } from 'react';


const ShowClientsAndPhotographers = () => {
    // var [clients, setclients] = useState(0);
    // const ClientBtnClick = async (e)=>{
    //     const response = await axios.get("http://localhost:4000/clients")
    //     all_clients = response.data;
    //     console.log(all_clients)
    // }
    // var all_clients = []
    const ClientBtnClick = (e)=>{
        var response = axios.get(process.env.REACT_APP_BACKEND_URL+"/clients").then((response)=>{
            // clients = response.data;
            var all_clients = response.data;
            console.log("ALL CLIENTS IN DATABASE:");
            console.log(all_clients);
            // setclients(response.data);
            // console.log(clients);
        })
    }

    const PhotographerBtnClick = (e)=>{
        var response = axios.get(process.env.REACT_APP_BACKEND_URL+"/photographers").then((response)=>{
            // clients = response.data;
            var all_photographers = response.data;
            console.log("ALL PHOTOGRAPHERS IN DATABASE:");
            console.log(all_photographers);
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


            <button 
            onClick = {PhotographerBtnClick}
            // style = {{backgroundColor: props.color}} 
            // className= 'btn'
            >
            {/* {props.text} */}
            Console Log All Photographers
            </button>

            
            

        </div>
        
    )
}



export default ShowClientsAndPhotographers