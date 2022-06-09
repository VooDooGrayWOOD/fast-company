import React from 'react'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './layouts/login'
import { ToastContainer } from 'react-toastify'
import { ProfessionProvider } from './hooks/useProfession'
import { QualitiesProvider } from './hooks/useQualities'
import Main from './layouts/main'

const App = () => {
    return (
        <div>
            <NavBar />
            <QualitiesProvider>
                <ProfessionProvider>
                    <Switch>
                        <Route
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </QualitiesProvider>
            <ToastContainer />
        </div>
    )
}

export default App
