import React from 'react'
import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {
    return (
        <>
            {users.map((user) => (
                <Link key={user._id} to={`/users/${user._id}`}>
                    <h3>{}</h3>
                </Link>
            ))}
        </>
    )
}

export default UsersList
