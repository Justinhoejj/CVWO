import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.form`
    border: 2px solid black;
    margin-bottom: 1px;
    background-color:${props => !props.done? "red": "lightgreen"};

    button{
        &:hover{
            border: 2px solid red;
        }
    }

    input {
        width:40px;
      }
`


export default function SubtaskCard(props){
    const [done, setDone] = useState(props.attributes.done)
    const [checked, setChecked] = useState(done)
    const url = `/api/v1/subtasks/${props.attributes.id}`
    
    const handleDone = (e)=>{
         axios.put(url, {done:!checked})
         .then(resp=>console.log(resp))
         .catch(resp=>console.log(resp))
    }
    const handleDelete = (e) => {
        axios.delete(url)
        .then(resp=>console.log(resp))
        .catch(resp=>console.log(resp))
    }


    return(
    <Wrapper done={checked}>
        <button onClick={handleDelete}>Remove</button>
        {props.attributes.name}<input type="checkbox" onChange={()=>{
            setChecked(!checked) 
            handleDone()}} 
            checked={checked} />
    </Wrapper>
    )
}