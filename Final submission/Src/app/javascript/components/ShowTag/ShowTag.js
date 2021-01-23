import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TaskCard from './TaskCard'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
   margin-right: 40px; 
    button{       
        margin-top: 30px;
        padding: 5px 5px 5px 5px;
        border: 1px solid black;
        font-size: 16px;
        background-color: lightblue;
        border: 1px solid red;

        &:hover{
            border: 3px solid red;
            color: red;
        }
    }
    
    h1 {
        margin-left: 40px;
    }

    a {
        margin-left: 40px; 
        text-decoration:none;
        color: black;
        font-size: 20px;
        
    }
`

export default function ShowTag(props){
    const [tasks, setTasks] = useState([])
    const id = props.match.params.id
    const [tagname, setTagname]= useState()

    // retrieves all tasks related to current tag
    useEffect(()=>{
        axios.get(`/api/v1/tags/${id}`)
        .then(resp=>{
            setTasks(resp.data.relations)
            setTagname(resp.data.data.name)
        })
        .catch(resp=>console.log(resp))
    },[])
    
    const list = tasks.map( item =>{
        return(
        <TaskCard 
            key={item.id}
            data={item}
            />
        )
    })
    // deletes the tag and all its associations
    const handleDelete = ()=>{
        axios.delete(`/api/v1/tags/${id}`)
        .then(resp => console.log(resp))
        .catch(resp => console.log(resp))
        console.log(id)
    }

    return (
        <Wrapper>
                <h1>You have {tasks.length} tasks under {tagname} </h1>
            <Link to={``}>
                <button onClick={handleDelete}>Remove </button> {tagname} tag from all tasks
            </Link>
                <ul>
                    {list}
                </ul>
        </Wrapper>
    )
}