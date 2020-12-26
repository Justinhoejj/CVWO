import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Wrapper = styled.div `
    padding: 100px 100px 10px 100px;
    outline: grey;
`
export default function Header(){
    return(
    <Wrapper>
        <Link to={`/`}>View all Tasks</Link>
        <p>View completed</p>
        <Link to={`/tags`}>Search by tags</Link>
    </Wrapper>)
}

