import React, { useState } from 'react'
import axios from 'axios'

export default function SubtaskField(props){
    const [subtask, setSubtask]=useState({})
    
    const handleChange = (e) =>{
        setSubtask(Object.assign({done:false, task_id:props.taskid}, subtask, {[e.target.name]: e.target.value}))
    }
    
    const handleSubmit = () =>{
        axios.post(`/api/v1/subtasks`, subtask)
        .then(resp=>console.log(resp))
        .catch(resp=>console.log(resp))
    }

    
    return(
        <form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="name" type="field" placeholder="Name of Subtask"/>
        <button type="submit">Add subtask</button>
        </form>
    )
}