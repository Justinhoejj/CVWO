import React, { useState, useEffect } from 'react'
import axios from 'axios'
import TaskCard from './TaskCard'
import styled from 'styled-components'

const Home = styled.div `
    text-align: center;
    max-width: 1200px;
    margin-left: auto;
    margin-right: auto;
`
const Header = styled.div `
    padding: 100px 100px 10px 100px;
    
    h1 {
        font-size: 42px;
    }
`
const Card = styled.div`
    display: grid;

`
export default function AllTasks() {
    const [tasks, setTasks] = useState([])

    useEffect(()=>{
        //get all tasks from api
        //update tasks in state
        axios.get('api/v1/tasks.json')
        .then( resp => {
            setTasks(resp.data.data)
        })
        .catch( resp=>console.log(resp))

    }, [tasks.length])

    const list = tasks.map( item=>{
        return(
        <TaskCard 
            key={item.id}
            data={item}
            />


        )
    })

    return (
    <Home>
        <Header>
            <h1>You have {tasks.length} tasks due for completion</h1>
        </Header>
        <Card>
        <ul>{list}</ul>
        </Card>
    </Home>    
        )
}