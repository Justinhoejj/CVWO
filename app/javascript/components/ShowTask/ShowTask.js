import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card'

export default function ShowTask(props) {
    const [task, setTask] = useState({})
    const [subtasks, setSubtasks] = useState([])// for future use
    const [tags, setTags] = useState([])
    const [loaded, setLoaded] = useState(false)//to prevent preemptive return data calls

    useEffect(()=>{
        const id = props.match.params.id
        const url = `/api/v1/tasks/${id}`

        axios.get(url)
        .then(resp=> {
            setTask(resp.data)
            setLoaded(true)
        })
        .catch(resp=>console.log(resp))
    },[])

    return (
    <div className="wrapper">
        { loaded &&
        <Card
            attributes = {task.data}
            relations = {task.relations}
        />
        }
        <div className="subtask">sub task here</div>
    </div>
    )
}