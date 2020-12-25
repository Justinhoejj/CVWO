import React, {useState} from 'react'
import axios from 'axios'

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
        .then(resp =>{console.log(resp)})
        .catch(resp=>{console.log(resp)})
    }
    
    return (
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <input onChange={handleChange} type="text" name="title"  placeholder="Task Title"/>
                </div>
                <div className="field">
                    <input onChange={handleChange} type="field" name="body" placeholder="Task Description"/>
                </div>
                <div className="field">
                    <input onChange={handleChange} type="field" name="due" placeholder="yyyy-mm-dd"/>
                </div>
                    <button type="submit">Add task</button>
            </form>
        </div>
    )
}