import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Wrapper = styled.div`
    display: grid;
    margin: 6rem;
    flex-direction: row;
    justify-content: space-between;
    `
const Tag = styled.div`
    a{  
        border-radius: 5px;
        color: white;
        font-family: "Hind", sans-serif;
        display: inline-block;
        padding: 0.5rem 0.5rem;
        margin: o.5rem 1rem;
        text-align: center;
        background-color: grey;
        text-decoration: none;
        width: 100%;
    }
`

export default function AllTags() {
    const [tags, setTags]=useState([])
    
    useEffect(()=>{
        axios.get(`/api/v1/tags.json`)
        .then(resp=>setTags(resp.data.data))
        .catch(resp=>console.log(resp))
    },[])
    
    const ordered = tags.sort((a,b)=> a.name.localeCompare(b.name))
    const tagcards = ordered.map(
        item =>{
            return( 
            < Tag key={item.id}>
                <Link to={`/tags/${item.id}`}>
                    {item.name}
                </Link>
            </ Tag>
            )
        })



    return (
        <div>
            {tagcards}
    
        </div>
    )
}