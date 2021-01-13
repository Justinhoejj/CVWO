import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Form = styled.form`
input {
    margin-left: 20px;
    resize: none;
    overflow: hidden;
    min-height: 50px;
    font-size: 24px;
    font-color: black;
    background-color: #AAE5F7;
    border: 3px solid #609BC9;

    &:hover{
        border: 5px solid #609BC9; 
    }
    }
button {
    font-size: 20px;
    border: 3px solid black;
    &:hover{
        border: 5px solid black; 
    }
}
`


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
        <Form onSubmit={handleSubmit}>
        <input onChange={handleChange} name="name" type="field" placeholder="Name of Subtask"/>
        <button type="submit">Add</button>
        </Form>
    )
}