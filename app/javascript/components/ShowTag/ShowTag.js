import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TaskCard from '../AllTasks/TaskCard'
import { Link } from 'react-router-dom'

export default function ShowTag(props){
    const [tasks, setTasks] = useState([])
    const id = props.match.params.id
    const [tagname, setTagname]= useState()

    useEffect(()=>{
        axios.get(`/api/v1/tags/${id}`)
        .then(resp=>{
            setTasks(resp.data.relations)
            setTagname(resp.data.data.name)
        })
        .catch(resp=>console.log(resp))
    },[])
    
    const list = tasks.map( item=>{
        return(
        <TaskCard 
            key={item.id}
            data={item}
            />
        )
    })

    const handleDelete = ()=>{
        axios.delete(`/api/v1/tags/${id}`)
        .then(resp => console.log(resp))
        .catch(resp => console.log(resp))
        console.log(id)
    }

    return (
        <div>
        <Link to={``}>
            <button onClick={handleDelete}>Remove Tag from all tasks</button>
        </Link>
        <h1>You have {tasks.length} tasks under {tagname} </h1>
        <ul>
            {list}
        </ul>
        </div>
    )
}