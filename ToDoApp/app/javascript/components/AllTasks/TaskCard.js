import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

const currentDate = new Date();
const Card = styled.div`
    border: 1px solid #efefef;
    background: #fff;
    padding: 10px 50px;
    display:flex;

    button{
      margin-right: 100px;
    }
`

const Tasktitle=styled.div`
    font-size: 30px;
`
export default function TaskCard (props) {

    const handleComplete = () => {
      axios.put(`api/v1/tasks/${props.data.id}`, {done:true})
      .then(resp=>{
        console.log(resp)
        props.setLoaded(false)
      })
      .catch(resp=>console.log(resp))
    }

    return(
        <Card>
          <Link to={`/tasks/${props.data.id}`}>
            <Tasktitle>{props.data.title}</Tasktitle> <div className="sub-tasks">Due:{props.data.due}</div>
          </Link>
          <button onClick={handleComplete} className="checkbox">comlete</button>
        </Card>
    )
}