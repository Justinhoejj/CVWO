import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Card = styled.div`
    border: 1px solid #efefef;
    background: #fff;
    padding: 10px 50px;
    display:flex;
    font-family: sans-serif;

    button{
      margin-right: 100px;
    }
`

const Tasktitle=styled.div`
    font-size: 30px;
`
const Due = styled.div`
    display:inline-block;
`

const currentDate = new Date();


export default function TaskCard (props) {
    
  const [subTasks, setSubTasks] = useState([]);
  const undone = subTasks.filter(item=>item.done)
  const total = subTasks.length
    
  const handleComplete = () => {
      axios.put(`api/v1/tasks/${props.data.id}`, {done:true})
      .then(resp=>{
        console.log(resp)
        props.setLoaded(false)
      })
      .catch(resp=>console.log(resp))
    }

    useEffect(() => {
      axios.get(`api/v1/tasks/${props.data.id}`)
      .then(resp => setSubTasks(resp.data.subtasks))
      .catch(resp => console.log(resp))
    },[])


    return(
        <Card>
          <Link to={`/tasks/${props.data.id}`}>
            <Tasktitle>{props.data.title}</Tasktitle>
            <Due>
              Due:{props.data.due}
              <>      
              {undone.length}/{total} complete
              </>
            </Due>
          </Link>
          <button onClick={handleComplete} className="checkbox">comlete</button>
        </Card>
    )
}