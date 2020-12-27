import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div `
    padding: 100px 100px 50px 100px;
    justify-content: space-between;
    display: flex;
    

    a { 
        color:#fff;
        background: #000;
        padding: 10px 50px;
        text-decoration: none;

    }
`
export default function Header(){
    return(
    <Wrapper>
            <Link to={`/`}>View all Tasks</Link>
            <Link to={`/tags`}>Search by tags</Link>
    </Wrapper>)
}

