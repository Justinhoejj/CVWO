import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Button = styled.button`
    font-size:18px;
    border: 1px solid black;
    border-radius: 3px;
    &:hover{
        border: 5px solid black; 
    }
`

export default function HandleTag(props) {
    // pick up data for association
    const taggingData = {
        "task_id":props.task.data.id,
        "tag_id":props.tag.id
    }
    // creates association
    const handleTagging = () => {
        axios.post(`/api/v1/taggings`, taggingData)
        .then(resp=>{
            {props.setLoaded(false)}
        })
        .catch(resp=> console.log(resp))
    }
    
    return (
    <Button onClick={handleTagging}>
        {props.tag.name}
    </Button>
    )
}