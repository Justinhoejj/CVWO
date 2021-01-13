import React, {useState} from 'react'
import axios from 'axios'
import HandleTag from './HandleTag'
import styled from 'styled-components'

const Wrapper = styled.div`
    text-align: center; 
    font-family: sans-serif;    
    h1 {
        font-size: 30px;
        font-family: sans-serif;
        text-decoration: underline;
    }

    input {
        font-size: 14px;
        margin-left:10px;
        margin-right: none;
        width: 70px;
        border-radius: 3px;
        background-color:lightblue;
    }

    button {
        background-color:lightblue;
    }
`


export default function TagField(props){
    const [tagName, setTagname] =useState({})

    const allTags = props.tagsIndex.map(
        item => { return(
            <HandleTag
                tag = {item}
                key = {item.id}
                task = {props.task}
                setLoaded={props.setLoaded}
            />
        )}
    )
    
    const handleChange = (e)=>{
        e.preventDefault()
        setTagname((Object.assign({}, tagName, {[e.target.name]: e.target.value})))
        console.log(tagName)
    }

    const handleCreate = (e)=>{
        e.preventDefault()
        axios.post(`/api/v1/tags`, tagName)
        .then(resp=>{
            props.setLoaded(false)
        })
        .catch(resp=>console.log(resp))

    }
    
    return(
        <Wrapper>
        <h1>ADD TAGS</h1>
        <p>Pick from existing tags or
        <input onChange={handleChange} name="name" type="text" placeholder="Create Tag"/>
        <button onClick={handleCreate}> + </button>
        to track your tasks
        </p>
        <ul>
            {allTags}
        </ul>
        </Wrapper>
    )
}