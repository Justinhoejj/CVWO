import React, {useState} from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`

`

const Form = styled.form`
    display: inline-box;
`

const Field =styled.div`
    font-family: sans-serif;
    font-size: 25px;
    padding: 50px;
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
                <Field>
                    <input onChange={handleChange} type="text" name="title"  placeholder="Task Title"/>
                </Field>
                <Field>
                    <input onChange={handleChange} type="field" name="body" placeholder="Task Description"/>
                </Field>
                <Field>
                    <input onChange={handleChange} type="field" name="due" placeholder="yyyy-mm-dd"/>
                </Field>
                    <button type="submit">Add task</button>
            </Form>
        </Wrapper>
    )
}