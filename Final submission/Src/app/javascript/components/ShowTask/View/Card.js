import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import axios from 'axios'
import Tag from './Tag'
import SubtaskCard from './SubtaskCard'

const Wrapper = styled.div`
    font-size: 30px;
    padding-left:20px;
    padding-right:20px;
`
const DeleteButton = styled.button`
    color:red;
    border:solid 3px red;
    font-size: 30px;

    &:hover{
        border: 2px solid red;
    }
`

const TagArea = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom:10px;
`

export default function Card(props) {
    const {title, body, done, due, id} = props.attributes
    const taggingids = props.taggings.map(item=>{return item.id})
    const tagnames = props.relations.map(item=>{return item.name})
    // matches tagging association with tag name
    const zipped = taggingids.map(function(e, i){
        return[e, tagnames[i]]
    })
    const tag = zipped.map((item)=>{
        return (<Tag
        key = {item[0]}
        data ={item}
        setLoaded={props.setLoaded}
        />)
    })
    
    const subtasks = props.subtasks.map( item => {
        return (
            <SubtaskCard 
                key = {item.id}
                attributes={item}
                taskid={id}
            />
        )
    })

    const handleDelete = () => {
        const url =`/api/v1/tasks/${id}`
        axios.delete(url)
        .then(resp=>console.log(resp))
        .catch(resp=>console.log(resp))
    }
    
    return( 
    <Wrapper>
        <h1>{title}</h1>
        <p>{body}</p>
        <p>Deadline: {due}</p>
        <TagArea>
            {tag}
        </TagArea>
        <p>To dos:</p>
        {subtasks}
        <br/>
        <Link to={``}>
        <DeleteButton onClick={handleDelete}>Delete Task</DeleteButton>
        </Link>
    </Wrapper>
    )
}