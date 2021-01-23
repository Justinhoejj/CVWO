import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Wrapper = styled.div`
         display: flex;
         justify-content: center;
         align-itemms: space-between;
         resize: horizontal;
         overflow:auto;
        //  border: 2px solid black;
         a{ 
            background-color: grey;
            border-radius: 5px;
            color: white;
            text-decoration: none;
            padding: 0.53em 1em;
            margin: 8px;
            border:1px solid black;
            &:hover{
                border: 3px solid black;
                font-size: 20px;
                color:black;
            }
         }
    `

export default function AllTags() {
    const [tags, setTags]=useState([])

    useEffect(()=>{
        axios.get(`/api/v1/tags.json`)
        .then(resp=>setTags(resp.data.data))
        .catch(resp=>console.log(resp))
    },[])

    //sorts tags alphabetically
    const ordered = tags.sort((a,b)=> a.name.localeCompare(b.name))
    
    //wraps task into a component that links to associated tasks
    const tagcards = ordered.map(
        item =>{
            return( 
                <Link to={`/tags/${item.id}`} key={item.id}>
                    {item.name}
                </Link>
            )
        })
    return (
        <Wrapper>
            {tagcards}
        </Wrapper>
    )
}