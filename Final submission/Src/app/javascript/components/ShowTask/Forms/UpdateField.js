import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
    margin-top: 50px;
    margin-left: 100px;
    margin-bottom: 50px;
    text-align: center;
    font-family: sans-serif;

    input {
        width: 500px;
        resize: none;
        overflow: hidden;
        min-height: 50px;
        font-size: 20px;
        font-color: black;
        background-color: #AAE5F7;
        border: 3px solid #609BC9;
        margin-left:-100px;
        
        &:hover{
            border: 5px solid #609BC9; 
        }
    }
    
    h1{ 
        margin-left: -40px;
        font-size:35px;
        text-decoration:underline;
    }
    }
`

const TaskDetails = styled.textarea`
    margin-left: -100px;    
    width: 500px;
    height: 200px;
    font-size:20px;
    font-color: black;
    background-color: #AAE5F7;
    border: 3px solid #609BC9;

`
const LastRow = styled.div`

    display: flex;
    justify-content: center;    
    input {
        width:300px;
        margin-right: 6%;
    }

    button {
        font-size:15px;
        border: 3px solid black;
        height: 50px;
        width: 150px;
        margin-top:5px;

        &:hover{
            border:5px solid black;
        }
`



export default function UpdateField(props){
    return(
        <Wrapper>
            <form onSubmit={props.handleSubmit}>
                <h1>Specify Tasks Here</h1>
                    <input onChange={props.handleChange} type="text" name="title" placeholder="Change Task Title"/>
                    <br/>
                    <TaskDetails onChange={props.handleChange}  name="body" placeholder="Task Details"/>
                    <br/>
                    <LastRow>
                    <input onChange={props.handleChange} type="text" name="due" placeholder="yyyy-mm-dd"/>
                    <button type="submit">Make Changes</button>
                    </LastRow>
            </form>
        </Wrapper>
    )

}