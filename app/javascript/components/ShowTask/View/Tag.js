import Axios from 'axios'
import React from 'react'
import axios from 'axios'

export default function Tag(props){
    const tagname = props.data[1]
    const taggingid = props.data[0]
    
    const handleUntag = (e)=>{
        axios.delete(`/api/v1/taggings/${taggingid}`)
        .then(resp=>{
            props.setLoaded(false)
        })
        .catch(resp=>console.log(resp))
    }
    
    return(
        <div>
        {tagname}<button onClick={handleUntag}>Remove</button>
        </div>
    )
}