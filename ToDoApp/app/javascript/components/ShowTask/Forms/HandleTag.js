import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Button = styled.button`
    font-size:12px;
`


export default function HandleTag(props) {
    const taggingData = {
        "task_id":props.task.data.id,
        "tag_id":props.tag.id
    }

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