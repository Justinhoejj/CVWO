import Axios from 'axios'
import React from 'react'
import axios from 'axios'

export default function Tag(props){
    
    //const tagNames
    const getTagName = ()=>{

    }
    const handleUntag = (e)=>{
        
    }
    
    return(
        <div>
        {props.tag.name} <button onClick={getTagName}>Remove</button>
        </div>
    )
}