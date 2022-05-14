import React from 'react'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './layouts/home'
import Login from './layouts/login'
import UserPage from './components/page/userPage/userPage'
import EditUserPage from './components/page/editUserPage'

const App = () => {
    return (
        <div>
            <NavBar />
            <Switch>
                <Route
                    path="/users/page/:usersId?/edit"
                    component={EditUserPage}
                />
                <Route path="/users/page/:usersId?" component={UserPage} />
                <Route path="/users" component={Users} />
                <Route path="/login/:type?" component={Login} />
                <Route path="/" exact component={Home} />
                <Redirect to="/" />
            </Switch>
        </div>
    )
}

export default App
