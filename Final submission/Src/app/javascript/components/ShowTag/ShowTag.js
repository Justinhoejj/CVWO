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
        font-size: 16px;
        background-color: lightblue;
        border: 1px solid red;
        color:red;

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
    p{
        margin-left: 40px;
    }
`

export default function ShowTag(props){
    const [tasks, setTasks] = useState([])
    const id = props.match.params.id
    const [tagname, setTagname]= useState()
    const [torender, setTorender]=useState([])

    // retrieves all tasks related to current tag
    useEffect(()=>{
        axios.get(`/api/v1/tags/${id}`)
        .then(resp=>{
            setTasks(resp.data.relations)
            setTagname(resp.data.data.name)
        })
        .catch(resp=>console.log(resp))
    },[])
    
    const undone = tasks.filter(item => !item.done)
    const handleSort = (e) => {
        if(e.target.value === "soon") {
            setTorender(undone.sort((a, b) => a.due.localeCompare(b.due)))
        } else if(e.target.value === "oldest") {
            setTorender(undone.sort((a, b) => a.created_at.localeCompare(b.created_at)))
        } else if(e.target.value === "created") {
            setTorender(undone.sort((a, b) => b.created_at.localeCompare(a.created_at)))
        } else if(e.target.value === "lowest") {
            setTorender(undone.sort((a, b) => b.due.localeCompare(a.due)))
        } else if(e.target.value === "a") {
            setTorender(undone.sort((a, b) => b.title.localeCompare(a.title)))
        } else if(e.target.value === "z") {
            setTorender(undone.sort((a, b) => b.title.localeCompare(a.title)))
        }
    }
    const list = torender.map( item =>{
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
                <h1>You have {undone.length} tasks under {tagname}</h1>
                <p>View by:
                <select onChange={handleSort}>
                    <option>--</option>
                    <option value="soon">Due Soon</option>
                    <option value="created">Recently created</option>
                    <option value="oldest">Oldest</option>
                    <option value="lowest">Least priority</option>
                    <option value="a">Title A - Z</option>
                    <option value="z">Title Z - A</option>
                </select>
                </p>
            <Link to={``}>
                <button onClick={handleDelete}>Remove </button> {tagname} tag from all tasks
            </Link>
                <ul>
                    {list}
                </ul>
        </Wrapper>
    )
}