import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { About } from '../about'
import { Blog } from '../blog'
import { Home } from '../home'
import { Resume } from '../resume'

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/blog">
          <Blog />
        </Route>
        <Route path="/resume">
          <Resume />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
