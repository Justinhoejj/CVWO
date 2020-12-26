import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function AllTags() {
    const [tags, setTags]=useState([])
    
    useEffect(()=>{
        axios.get(`/api/v1/tags.json`)
        .then(resp=>setTags(resp.data.data))
        .catch(resp=>console.log(resp))
    },[])
    
    const tagcards = tags.map(
        item =>{
            return( 
            <li key={item.id}>
                <Link to={`/tags/${item.id}`}>
                    {item.name}
                </Link>

            </li>
            )
        })



    return <ul>{tagcards}</ul>
}