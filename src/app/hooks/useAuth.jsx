import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import userService from '../services/user.service'
import { toast } from 'react-toastify'
import { setTokens } from '../services/localStorage.service'

const httpAuth = axios.create()

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

const AuthProvider = ({ children }) => {
    const [currentUser, setUser] = useState({})
    const [error, setError] = useState(null)

    async function signIn({ email, password }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
        } catch (error) {
            errorCatcher(error)
            // INVALID_PASSWORD
            let { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'INVALID_PASSWORD') {
                    const errorObject = {
                        password: 'Не правильный пароль'
                    }
                    throw errorObject
                } else if (message === 'EMAIL_NOT_FOUND') {
                    const errorObject = {
                        email: 'Такой Email не зарегестрирован'
                    }
                    throw errorObject
                }
            }
        }
    }

    async function signUp({ email, password, ...rest }) {
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_FIREBASE_KEY}`
        try {
            const { data } = await httpAuth.post(url, {
                email,
                password,
                returnSecureToken: true
            })
            setTokens(data)
            await createUser({ _id: data.localId, email, ...rest })
        } catch (error) {
            errorCatcher(error)
            const { code, message } = error.response.data.error
            if (code === 400) {
                if (message === 'EMAIL_EXISTS') {
                    const errorObject = {
                        email: 'Пользователь с таким Email уже существует'
                    }
                    throw errorObject
                }
            }
            // throw new Error
        }
    }

    async function createUser(data) {
        try {
            const { content } = userService.create(data)
            setUser(content)
        } catch (error) {
            errorCatcher(error)
        }
    }

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    return (
        <AuthContext.Provider value={{ signUp, currentUser, signIn }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}

export default AuthProvider
