import React, { useState } from 'react'
import axios from 'axios'
import styled from 'styled-components'


const Wrapper = styled.div`
    font-size:26px;
    font-family: georgia;

    button{
            border: 1px solid red;
            border-radius: 3px;
            background-color: lightblue;
            font-family:georgia;
            font-size: 30px;

            &:hover{
                border: 1px solid lightblue;
                color: lightblue;
                background-color:red;
            }
        }

`

export default function ClearHistory(props)  {
    const {tasks, complete, setLoaded} = props
    const completed = tasks.filter(item => item.done)
    const completedid = completed.map(item =>{return item.id})
    var i = 0;
    // delete tasks one at a time
    const handleClearHistory = () => {
        if(i < completed.length){    
            axios.delete(`api/v1/tasks/${completedid[i]}`)
            .then(resp => handleClearHistory())
            .catch(resp => console.log(resp))
            i = i + 1
        } else{
            setLoaded(false)
        }
    }
    // renders only when user is looking at done tasks
    if(complete) {
        return ( 
        <Wrapper>
        <button onClick={handleClearHistory}>Clear History</button>
        </Wrapper>
        )
    } else {
        return null
    }
}