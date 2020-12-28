import React, { useState } from 'react'
import axios from 'axios'

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
    <form>
        {props.attributes.name}<input type="checkbox" onChange={()=>{
            setChecked(!checked) 
            handleDone()}} 
            checked={checked} />
        <button onClick={handleDelete}>Delete</button>
    </form>
    )
}