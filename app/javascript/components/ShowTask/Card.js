import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'

const Wrapper = styled.div`
    padding: 50px 100px 50px 0; 
    font-size: 30px;
    
`

export default function Card(props) {
    const {title, body, done, due, id} = props.attributes
    const tags = props.relations//destructure the relations components
    
    const list = tags.map(item=>{
       return( 
       <ul key={item.id}>{item.name}</ul>
       )
    })
    
    const handleDelete = () => {
        const url =`/api/v1/tasks/${id}`
        axios.delete(url)
        .then(resp=>console.log(resp))
        .catch(resp=>console.log(resp))
    }
    
    return( 
    <Wrapper>
        <h1>{title}</h1>
        <p>{body}</p>
        <p>{due}</p>
        {list}
        <p>Sub tasks and tags goes here</p>
        <Link to={``}>
        <button onClick={handleDelete}>Delete</button>
        </Link>
    </Wrapper>
    )
}