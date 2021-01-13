import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-top: 50px;
    margin-left: 100px;
    margin-bottom: 50px;
    text-align: left;

    input {
        width: 350px;
        resize: none;
        overflow: hidden;
        min-height: 50px;
        font-size: 20px;
        font-color: black;
        background-color: #AAE5F7;
        border: 3px solid #609BC9;
        margin-left:-30px;
        &:hover{
            border: 5px solid #609BC9; 
        }
        }

    h1{ 
        margin-left:90px;
        font-size:35px;
        text-decoration:underline;
    }

    button {
        margin-left: 210px;
        font-size:15px;
        border: 3px solid black;

        &:hover{
            border:5px solid black;
        }
    }
`

const TaskDetails = styled.textarea`
    margin-left: -30px;    
    width: 350px;
    height: 200px;
    font-size:20px;
    font-color: black;
    background-color: #AAE5F7;
    border: 3px solid #609BC9;

`



export default function UpdateField(props){
    return(
        <Wrapper>
            <form onSubmit={props.handleSubmit}>
                <h1>Edit Task</h1>
                    <input onChange={props.handleChange} type="text" name="title" placeholder="Change Task Title"/>
                    <br/>
                    <TaskDetails onChange={props.handleChange}  name="body" placeholder="Task Details"/>
                    <br/>
                    <input onChange={props.handleChange} type="text" name="due" placeholder="yyyy-mm-dd"/>
                <button type="submit">Make Changes</button>
            </form>
        </Wrapper>
    )

}