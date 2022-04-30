import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import API from '../api/index'

const UserPage = () => {
    const history = useHistory()
    const [user, setUser] = useState()
    const params = useParams()
    const { usersId } = params

    useEffect(() => {
        API.users.getById(usersId).then((data) => setUser(data))
    })
    console.log(user)
    const handleAllUsers = () => {
        history.replace('/users')
    }

    return (
        <>
            {user ? <h2>{user.name}</h2> : `Loading...`}
            <button
                className="btn btn-outline-success btn-sm m-2"
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
