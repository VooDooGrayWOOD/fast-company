import React from 'react'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './layouts/login'
import { ToastContainer } from 'react-toastify'
import Main from './layouts/main'
import ProtectedRoute from './components/common/protectedRoute'
import LogOut from './layouts/logOut'
import AppLoader from './components/ui/hoc/appLoader'

const App = () => {
    return (
        <div>
            <AppLoader>
                <NavBar />
                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
                        component={Users}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    )
}

export default App
