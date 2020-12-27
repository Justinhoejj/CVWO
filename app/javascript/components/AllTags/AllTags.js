import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import styled from 'styled-components'


const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
`

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
            <div key={item.id}>
                <Link to={`/tags/${item.id}`}>
                    {item.name}
                </Link>
            </div>
            )
        })



    return (
        <Wrapper>
            {tagcards}
        </Wrapper>
    )
}