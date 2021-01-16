import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Wrapper = styled.div`
         display: flex;
         flex-wrap: wrap;
         justify-content: center;
         align-itemms: space-between;
         padding: 10px;
         resize: horizontal;
         overflow:auto;
         border: 1px solid black;
         a{ 
            background-color: grey;
            border-radius: 5px;
            color: white;
            text-decoration: none;
            padding: 0.53em 1em;
            margin: 8px;
            &:hover{
                border: 3px solid black;
                font-size: 16px;
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
    
    const ordered = tags.sort((a,b)=> a.name.localeCompare(b.name))
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