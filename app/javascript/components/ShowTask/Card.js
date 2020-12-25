import React from 'react'

export default function Card(props) {
    const {title, body, done, due} = props.attributes
    const tags = props.relations//destructure the relations components
    const list = tags.map(item=>{
       return( 
       <ul key={item.id}>{item.name}</ul>
       )
    })
    return( 
    <div className="wrapper">
        <h1>{title}</h1>
        <p>{body}</p>
        <p>{due}</p>
        {list}
    </div>
    )
}