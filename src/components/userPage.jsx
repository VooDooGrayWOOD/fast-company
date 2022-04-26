import React from 'react'
import { useHistory } from 'react-router-dom'

const UserPage = ({ id, users }) => {
    const history = useHistory()
    const getUserById = (id) => {
        return users.find((user) => user.id.toString() === id)
    }
    const handleAllUsers = () => {
        history.replace('/users')
    }
    const user = getUserById(id)
    return (
        <>
            <h2>{user ? user.label : `Loading...`}</h2>
            <button
                onClick={() => {
                    handleAllUsers()
                }}
            >
                Все Пользователи
            </button>
        </>
    )
}

export default UserPage
