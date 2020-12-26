import React, {useState} from 'react'
import axios from 'axios'
import HandleTag from './HandleTag'

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
        .then(resp=>console.log(resp))
        .catch(resp=>console.log(resp))

    }
    
    return(
        <div className="wrapper">
        <h1>Add a tag to track your tasks</h1>
        <input onChange={handleChange} name="name" type="text" placeholder="Create Tag"/>
        <button onClick={handleCreate}>Create tag</button>
        <p>Pick from existing tags</p>
        <ul>
            {allTags}
        </ul>
        </div>
    )
}