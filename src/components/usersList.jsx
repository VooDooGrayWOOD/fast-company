import React from 'react'
import { Link } from 'react-router-dom'

const UsersList = ({ users }) => {
    return (
        <>
            <Link key={users._id} to={`/users/page/${users._id}`}>
                {users.name}
            </Link>
        </>
    )
}

export default UsersList
