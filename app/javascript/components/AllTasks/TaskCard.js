import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Card = styled.div`
    border: 1px solid #efefef;
    background: #fff;
    padding: 10px 50px
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
            <button onClick={handleComplete} className="checkbox">comlete</button>
          <Link to={`/tasks/${props.data.id}`}>
            <div className="task-title">{props.data.title}</div>
            <div className="sub-tasks">completion bar</div>
          </Link>
        </Card>
    )
}