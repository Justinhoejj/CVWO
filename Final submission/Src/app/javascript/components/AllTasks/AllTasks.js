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
    select{
        border:2px solid black;
        font-size:16px;
        background-color: #AAE5F7;
        &:hover{
            border:3px solid black;
        }
    }
`
const Header = styled.div `
    padding: 10px 100px 10px 100px;
    display: inline-box;
    h1 {
        font-size: 42px;
    }
    }
`
const Sort = styled.div`
    margin-top: 10px;
    button {
        font-size: 15px;
        margin-top:30px;
        margin-left: 10px;
        padding: 2px;
        border-radius: 5px;
        border: 2px solid black;
        background-color: #AAE5F7;
    &:hover {
        font-weight: bold;
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
    const [torender, setTorender]=useState([])

    useEffect(()=>{
        // get all tasks from api
        // update tasks in state
        axios.get('api/v1/tasks.json')
        .then( resp => {
            setTasks(resp.data.data)
            setTorender(resp.data.data)
            setLoaded(true)
        })
        .catch( resp=>console.log(resp))

    }, [loaded])

    // seperate undone from done tasks when using filter
    const handleComplete = () => { setComplete(!complete)}
    
    // extracts all undone/done tasks depending on the state of complete
    const undone = tasks.filter(item => item.done === complete)

    // sets the order in which array is returned determined by user
    const handleSort = (e) => {
        if(e.target.value === "soon") {
            setTorender(undone.sort((a, b) => a.due.localeCompare(b.due)))
        } else if(e.target.value === "oldest") {
            setTorender(undone.sort((a, b) => a.created_at.localeCompare(b.created_at)))
            console.log("old")
        } else if(e.target.value === "created") {
            setTorender(undone.sort((a, b) => b.created_at.localeCompare(a.created_at)))
        } else if(e.target.value === "completed") {
            handleComplete()
            setTorender(tasks.filter(item=>item.done === complete))
        } else if(e.target.value === "lowest") {
            setTorender(undone.sort((a, b) => b.due.localeCompare(a.due)))
        } else if(e.target.value === "a") {
            setTorender(undone.sort((a, b) => a.title.localeCompare(b.title)))
        } else if(e.target.value === "z") {
            setTorender(undone.sort((a, b) => b.title.localeCompare(a.title)))
        }
    }
    // creates task card for each task
    const list = torender.map( item=>{
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
            <h1>You have {torender.length} {(()=>{return !complete?"tasks due for completion":"recently completed tasks"})()}</h1>
        </Header>
        <NewTask
            setLoaded={setLoaded}
        />
        <Sort>
        View <button onClick={()=>{handleComplete();handleSort();}}>{(()=>{return !complete?"Incomplete":"Completed"})()}</button> tasks by:
            <select onChange={handleSort}>
                <option>-select-</option>
                <option value="soon">Due Soon</option>
                <option value="created">Recently created</option>
                <option value="oldest">Oldest</option>
                <option value="lowest">Least priority</option>
                <option value="a">Title A - Z</option>
                <option value="z">Title Z - A</option>
            </select>
        </Sort>
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