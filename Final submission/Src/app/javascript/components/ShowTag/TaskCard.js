import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

//identical to taskcard in all task. Seperated because receive different props
export default function TaskCard (props) {
  const Card = styled.div`
    border: 2px solid;
    margin-bottom: 1px;
    background-color: lightgrey;
    color:black;
    padding: 0px 20px;
    display:flex;
    justify-content: space-between;
    font-family: sans-serif;

    a {
      color:black;
      background-color: lightgrey;
      text-decoration: none;
      border: 0px;
      margin-top: 0px;
      &:hover{
        border:0px;
        color:black;
      }
    }

    button{
      background: ${props.data.done ? "grey": "lightblue"};
      margin-top: 30px;
      margin-right: 50px;
      border-radius: 3px;
      font-size:15px;
      height: 30px;
      border: solid 2px black !important;
    }
`

const Words = styled.div`
    display: flex;
    
    h1 {
        font-size:30px;
      }

    p {
      margin-left:60px;
      font-size:30px;
    }

`
  const [subTasks, setSubTasks] = useState([]);
  const [loaded, setLoaded] = useState(true);
  const undone = subTasks.filter(item=>!item.done)
  const total = subTasks.length
  
  const handleComplete = () => {
    if(undone.length === 0) {
      axios.put(`/api/v1/tasks/${props.data.id}`, {done:true})
      .then(resp=>{
        console.log(resp)
        setLoaded(false)
      })
      .catch(resp=>console.log(resp))
    } else {
      console.log("incomplete subtasks")
    }
  }
    useEffect(() => {
      axios.get(`/api/v1/tasks/${props.data.id}`)
      .then(resp => setSubTasks(resp.data.subtasks))
      .catch(resp => console.log(resp))
    },[loaded])


    return(
        <Card>
          <Link to={`/tasks/${props.data.id}`}>
            <h1>{props.data.title}</h1>
          </Link>
          <Words>
            <p>Due:{props.data.due}</p>
            <p>{total - undone.length}/{total} <br/></p>
            <button disabled={props.data.done} onClick={handleComplete}>Complete</button>
          </Words>
        </Card>
    )
}