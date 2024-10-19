import { io } from 'socket.io-client';
import {useSelector} from "react-redux"
import { useEffect } from 'react';


let data ;
const func = () => {
    data = useSelector((state) => state.auth.userData);
    return data._id
}


const socket = io('http://localhost:8000' , {query : {
    userId : func()
}}); 

export default socket;
