import React from 'react'
import { Switch, Route } from 'react-router-dom'

import { About } from '../about'
import { Blog } from '../blog'
import { Home } from '../home'
import { Resume } from '../resume'

export const Routes = () => {
  return (
      <Switch>
        <Route path="/marcusgeduld/about">
          <About />
        </Route>
        <Route path="/marcusgeduld/blog">
          <Blog />
        </Route>
        <Route path="/marcusgeduld/resume">
          <Resume />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
  )
}
