import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card'
import UpdateField from './UpdateField'
import styled from 'styled-components'
import TagField from './TagField'

const Wrapper = styled.div `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: auto;
    margin-right: auto;
`

const Column = styled.div `
    background:#fff;
    height: 100vh;
    overflow: scroll;

    &:last-child{
        background: #000;
    }
`
const Main = styled.div`
    left-padding: 50px;
`

export default function ShowTask(props) {
    const [task, setTask] = useState({})
    const [subtasks, setSubtasks] = useState([])// for future use
    const [tags, setTags] = useState([])
    const [loaded, setLoaded] = useState(false)//to prevent preemptive return data calls
    const [newTask, setNewTask] = useState({})

    const id = props.match.params.id
    const url = `/api/v1/tasks/${id}`
    useEffect(()=>{
        axios.get(url)
        .then(resp=> {
            setTask(resp.data)
            setLoaded(true)
        })
        .catch(resp=>console.log(resp))
    },[loaded])

    const handleChange = (e)=>{
        e.preventDefault()
        setNewTask(Object.assign({}, newTask, {[e.target.name]: e.target.value}))
        console.log(newTask)
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        axios.put(url, newTask)
        .then(resp=>{
            setLoaded(false)
        })
        .catch(resp=>{console.log(resp)})
    }

    return (
    <Wrapper>
        { loaded &&
        <>
        <Column>
            <Main>
                
                <Card
                    attributes = {task.data}
                    relations = {task.relations}
                />
            </Main>
        </Column>    
        <Column>
            <UpdateField
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                attributes={task.data}

            />
            <TagField/>
            <div>Future subtask</div>
        </Column>
        </>
    }
    </Wrapper>
    )
}