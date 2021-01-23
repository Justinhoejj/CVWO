import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
input {
    resize: none;
    overflow: hidden;
    min-height: 50px;
    font-size: 24px;
    font-color: black;
    background-color: #AAE5F7;
    border: 3px solid #609BC9;
    width: 400px;

    &:hover{
        border: 5px solid #609BC9; 
    }
    }

button {
    font-size: 24px;
    border-radius: 5%;
    color: grey;
    background-color: lightblue;
    border: 2px solid #609BC9;

    &:hover {
        color: black;
        border: 6px solid #609BC9;
    }

    }
`
const Form = styled.form`
    display: inline-box;
`
const LastRow = styled.div`
    text-align: left;
    margin-left: 10px;
    input{
            width: 200px;
            margin-right: 20px;
        }

`


export default function NewTask(props) {
    const [task, setTask] = useState({})

    const handleChange = (e) => {
        e.preventDefault()
        console.log(task)
        setTask(Object.assign({done:false}, task, {[e.target.name]: e.target.value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('/api/v1/tasks', task)
        .then(resp =>{
            console.log(resp)
            props.setLoaded(false)
        })
        .catch(resp=>{console.log(resp)})
    }
    
    return (
        <Wrapper>
            <Form onSubmit={handleSubmit}>
                    <input onChange={handleChange} type="text" name="title"  placeholder="Task Title"/>
                    <br/>
                    <LastRow>
                    <input onChange={handleChange} type="date" name="due" placeholder="yyyy-mm-dd"/>
                    <button type="submit">Add</button>
                    </LastRow>
            </Form>
        </Wrapper>
    )
}