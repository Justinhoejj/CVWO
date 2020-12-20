// Where all frontend UI originate from. Points to views/application.html
import React from 'react'
import ReactDOM from 'react-dom'
import App from '../components/App'
import {BrowserRouter as Router, Route } from 'react-router-dom'


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Router>
      <Route path="/" component={App} />
    </Router>
    ,
    document.body.appendChild(document.createElement('div')),
  )
})
