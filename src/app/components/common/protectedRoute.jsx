import React from 'react'
import { useAuth } from '../../hooks/useAuth'
import PropTypes from 'prop-types'
import { Redirect, Route } from 'react-router-dom'

const ProtectedRoute = ({ component: Component, children, ...rest }) => {
    const { currentUser } = useAuth()
    return (
        <Route
            {...rest}
            render={(props) => {
                if (!currentUser) {
                    return (
                        <Redirect
                            to={{
                                pathname: '/login',
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
                return Component ? <Component {...props} /> : children
            }}
        />
    )
}

ProtectedRoute.propType = {
    component: PropTypes.func,
    location: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default ProtectedRoute
