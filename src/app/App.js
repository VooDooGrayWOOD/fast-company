import React from 'react'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './layouts/home'
import Login from './layouts/login'

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/:userId?/:edit?" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default App
