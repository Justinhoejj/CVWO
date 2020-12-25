import React from 'react'


export default function UpdateField(props){
    return(
        <div className="wrapper">
            <form onSubmit={props.handleSubmit}>
                <div>Edit Task</div>
                <div className="field">
                    <input onChange={props.handleChange} type="text" name="title" placeholder="Change Task Title"/>
                </div>
                <div className="field">
                    <input onChange={props.handleChange} type="text" name="body" placeholder="Task Details"/>
                </div>
                <div className="field">
                    <input onChange={props.handleChange} type="text" name="due" placeholder="yyyy-mm-dd"/>
                </div>
                <button type="submit">Make Changes</button>
            </form>
        </div>
    )

}