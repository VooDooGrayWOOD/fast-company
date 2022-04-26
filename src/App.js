import React from 'react'
import Users from './components/users'
import NavBar from './components/navBar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './layouts/home'
import Login from './layouts/login'

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/login" component={Login} />
                <Route path="/users/:usersId?" component={Users} />
                <Redirect from="/admin" to="/users" />
            </Switch>
        </div>
    )
}

export default App
