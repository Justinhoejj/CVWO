import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './View/Card'
import UpdateField from './Forms/UpdateField'
import styled from 'styled-components'
import TagField from './Forms/TagField'
import SubtaskField from './Forms/SubtaskField'

const Wrapper = styled.div `
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    margin-left: auto;
    margin-right: auto;
`

const Column = styled.div `
    background:#lightblue;
    height: 100vh;
    overflow: scroll;
    text-align:center;

    &:last-child{
        background: #888;
        text-align:center;
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
    const [tagsIndex, setTagsIndex] = useState([])

    const id = props.match.params.id
    const url = `/api/v1/tasks/${id}`

    useEffect(()=>{
        axios.get(`/api/v1/tags`)
        .then(resp=>{
            setTagsIndex(resp.data.data)
        })
        .catch(resp=>console.log(resp))
    },[loaded])

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
                    taggings = {task.taggings}
                    subtasks = {task.subtasks}
                    setLoaded= {setLoaded}
                />
            </Main>
        </Column>    
        <Column>
            <UpdateField
                handleChange={handleChange}
                handleSubmit={handleSubmit}
                attributes={task.data}
            />
            <SubtaskField
                taskid={task.data.id}
            />
            <TagField
                tagsIndex={tagsIndex}
                task = {task}
                setLoaded={setLoaded}
            />
        </Column>
        </>
    }
    </Wrapper>
    )
}