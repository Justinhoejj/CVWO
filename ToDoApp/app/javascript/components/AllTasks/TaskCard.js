import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Card = styled.div`
    border: 1px solid black;
    margin-bottom: 1px;
    background-color: lightgrey;
    color:white;
    padding: 0px 20px;
    display:flex;
    justify-content: space-between;
    font-family: sans-serif;

    a {
      color:black;
      text-decoration: none;
    }

    button{
      background: lightblue;
      margin-top: 20px;
      margin-right: 50px;
      border-radius: 3px;
      font-size:15px;
      height: 30px;
      border: solid 2px black;
    }

    
`

const Words = styled.div`
    display: flex;
    justify-content: flex-end;
    h1 {
        font-size:30px;
      }

    p {
      margin-left:30px;
      margin-right:0%;
      font-size:30px;
    }


`

const currentDate = new Date();


export default function TaskCard (props) {
    
  const [subTasks, setSubTasks] = useState([]);
  const undone = subTasks.filter(item=>!item.done)
  const total = subTasks.length
    
  const handleComplete = () => {
    if(undone.length === 0) {
      axios.put(`api/v1/tasks/${props.data.id}`, {done:true})
      .then(resp=>{
        console.log(resp)
        props.setLoaded(false)
      })
      .catch(resp=>console.log(resp))
    } else {
      console.log("incomplete subtasks")
    }
  }

    useEffect(() => {
      axios.get(`api/v1/tasks/${props.data.id}`)
      .then(resp => setSubTasks(resp.data.subtasks))
      .catch(resp => console.log(resp))
    },[])


    return(
        <Card>
          <Link to={`/tasks/${props.data.id}`}>
            <Words>
            <h1>{props.data.title}</h1>
              <p>Due:{props.data.due}</p>
              <p>{undone.length}/{total} complete</p>
            </Words>
          </Link>
          <button onClick={handleComplete} className="checkbox">Comlete</button>
        </Card>
    )
}