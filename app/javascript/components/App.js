import React from 'react'
import {Route, Switch} from 'react-router-dom'
import AllTasks from './AllTasks/AllTasks'
import ShowTask from './ShowTask/ShowTask'
import AllTags from './AllTags/AllTags'
import ShowTag from './ShowTag/ShowTag'
import Header from './Layout/Header'


export default function App(){
    return (
        <div>
       <Header/>
       <Switch>
           <Route exact path ="/" component={AllTasks}/>
           <Route exact path ="/tasks/:id" component={ShowTask}/>
           <Route exact path ="/tags" component ={AllTags}/>
           <Route exact path ="/tags/:id" component={ShowTag}/>
       </Switch>
       </div>
    )
}