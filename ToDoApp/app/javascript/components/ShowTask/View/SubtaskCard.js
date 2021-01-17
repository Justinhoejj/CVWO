import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.form`
    display: flex;
    justify-content: space-between;
    border: 2px solid black;
    margin-bottom: 1px;
    background-color:${props => !props.done? "red": "lightgreen"};

    button{
        background-color: ${props => !props.done? "red": "lightgreen"};
        color: ${props => props.done? "red": "lightgreen"};
        border: 0px;
        font-size:16px;
        margin-left:5px;
        border-radius:2px;

        &:hover{
            border: 2px solid red;
            font-weight: bold;
        }
    }

    input{
        display: inline-block;
        width: 20px;
        height: 20px;
        margin-right: 20px;
        margin-top:10px;
        transition: all 150ms;
        border-radius: 3px;

        &:checked{
        width:40px;
        
        }
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
        <button onClick={handleDelete}>X</button>
        {props.attributes.name}
        <input type="checkbox" onChange={()=>{
            setChecked(!checked) 
            handleDone()}} 
            checked={checked} />
    </Wrapper>
    )
}