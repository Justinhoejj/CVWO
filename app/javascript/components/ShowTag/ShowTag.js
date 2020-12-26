import React, {useState, useEffect} from 'react'
import axios from 'axios'
import TaskCard from '../AllTasks/TaskCard'

export default function ShowTag(props){
    const [tasks, setTasks] = useState([])
    const id = props.match.params.id

    useEffect(()=>{
        axios.get(`/api/v1/tags/${id}`)
        .then(resp=>setTasks(resp.data.relations))
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
        .then(resp => console.log(id))
        .catch(resp => console.log(resp))
        console.log(id)
    }

    return (
        <div>
        <button onClick={handleDelete}>Remove Tag from all tasks</button>
        <ul>
            {list}
        </ul>
        </div>
    )
}