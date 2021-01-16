import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: grey;
    border-radius:5px;
    margin-right:5px;
    font-size: 18px;
    padding: 0px 0px 0px 5px;
    
    button{
        font-family: arial;
        color:white;
        background-color:grey;
        border: 0px;
        font-size: 15px;

        &:hover{
            font-size: 17px;
            color: red;
        }
    }
`

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
        <Wrapper>
        {tagname}<button onClick={handleUntag}>X</button>
        </Wrapper>
    )
}