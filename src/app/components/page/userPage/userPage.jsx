import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import API from '../../../api'
import PropTypes from 'prop-types'
import Qualities from '../../ui/qualities'

const UserPage = () => {
    const history = useHistory()
    const [user, setUser] = useState()
    const params = useParams()
    const { usersId } = params

    useEffect(() => {
        API.users.getById(usersId).then((data) => setUser(data))
    }, [])

    const handleAllUsers = () => {
        history.replace('/users')
    }

    if (user) {
        return (
            <div>
                <h1> {user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <Qualities qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button
                    onClick={handleAllUsers}
                    className="btn btn-outline-success btn-sm m-2"
                >
                    {' '}
                    Все Пользователи
                </button>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

UserPage.propTypes = {
    userId: PropTypes.string
}

export default UserPage
