import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskCard from './TaskCard'
import NewTask from './NewTask'
import ClearHistory from './ClearHistory'
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
// first view
export default function AllTasks() {
    const [tasks, setTasks] = useState([])
    const [complete, setComplete] = useState(false)
    const [loaded, setLoaded] =useState(true)
    
    // seperate undone from done tasks when using filter
    const handleComplete = () => {
        setComplete(!complete)
    }

    useEffect(()=>{
        // get all tasks from api
        // update tasks in state
        axios.get('api/v1/tasks.json')
        .then( resp => {
            setTasks(resp.data.data)
            setLoaded(true)
        })
        .catch( resp=>console.log(resp))

    }, [loaded])

    // extracts all undone/done tasks depending on the state of complete
    const undone = tasks.filter(item=> item.done === complete) 
    // creates task card for each task
    const list = undone.map( item=>{
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
            <h1>You have {undone.length} {(()=>{return !complete?"tasks due for completion":"recently completed tasks"})()}</h1>
            <button onClick={handleComplete}>{(()=>{return !complete?"Review Completed":"View Incomplete"})()}</button>
        </Header>
        <NewTask
            setLoaded={setLoaded}
        />
        <Card>
            <ul>{list}</ul>
        </Card>
        <ClearHistory
            complete={complete}
            tasks={tasks}
            setLoaded={setLoaded}
        />
    </Home>    
        )
}