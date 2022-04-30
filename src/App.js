import React from 'react'
import Users from './components/users'
import NavBar from './components/navBar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './layouts/home'
import Login from './layouts/login'
import UserPage from './components/userPage'

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/users/page/:usersId?" component={UserPage} />
                <Route path="/users" component={Users} />
                <Route path="/login" component={Login} />
                <Route path="/" exact component={Home} />
                <Redirect from="/admin" to="/users" />
            </Switch>
        </div>
    )
}

export default App
