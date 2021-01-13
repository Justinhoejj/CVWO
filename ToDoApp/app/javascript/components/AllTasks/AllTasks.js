import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import styled from 'styled-components'

const Home = styled.div `
    text-align: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`
const Header = styled.div `
    padding: 50px 100px 10px 100px;
    display: inline-box;
    h1 {
        font-size: 42px;
    }
    button {
        font-size: 15px;
        margin-top:30px;
        margin-left: 10px;
        padding: 10px;
        border-radius: 5px;
        border: 2px solid black;
        background-color: lightblue;
    &:hover {
        font-weight: bold;
    }
    }
`
const Card = styled.div`
    display: grid;
    
`
export default function AllTasks() {
    const [tasks, setTasks] = useState([])
    const [complete, setComplete] = useState(false)
    const [loaded, setLoaded] =useState(true)
    const [subTasks, setSubtasks]=useState([])

    const handleComplete = () => {
        setComplete(!complete)
    }

    useEffect(()=>{
        //get all tasks from api
        //update tasks in state
        axios.get('api/v1/tasks.json')
        .then( resp => {
            setTasks(resp.data.data)
            console.log(resp)
            //setSubtasks(res)
            setLoaded(true)
        })
        .catch( resp=>console.log(resp))

    }, [loaded])


    const filtered = tasks.filter(item=> item.done === complete) //fillters all undone tasks

    const list = filtered.map( item=>{
        return(
        <TaskCard 
            key={item.id}
            data={item}
            setLoaded={setLoaded}
            />
        )
    })

    return (
    <Home>
        <Header>
            <h1>You have {filtered.length} {(()=>{return complete?"tasks due for completion":"recently completed tasks"})()}</h1>
            <button onClick={handleComplete}>{(()=>{return !complete?"Review Completed":"View Incomplete"})()}</button>
        </Header>
        <NewTask
            setLoaded={setLoaded}
        />
        <Card>
        <ul>{list}</ul>
        </Card>
    </Home>    
        )
}