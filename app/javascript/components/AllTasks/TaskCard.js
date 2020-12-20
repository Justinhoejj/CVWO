import React from 'react'
import styled from 'styled-components'

const Card = styled.div`
    border: 1px solid #efefef;
    background: #fff;
    padding: 10px 50px
`


export default function TaskCard (props) {
    return(
        <Card>
            <button className="checkbox">{props.data.due}</button>
            <div className="task-title">{props.data.title}</div>
            <div className="sub-tasks">for future use</div>
        </Card>
    )
}