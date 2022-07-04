import React from 'react'
import { useParams } from 'react-router-dom'
import EditUserPage from '../components/page/editUserPage'
import UserPage from '../components/page/userPage'
import UsersListPage from '../components/page/usersListPage'
import { useSelector } from 'react-redux'
import { getCurrentUserId, getDataStatus } from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    const dataStatus = useSelector(getDataStatus())
    const currentUserId = useSelector(getCurrentUserId())

    if (!dataStatus) return 'Loading...'
    return (
        <>
            <UsersLoader>
                {userId === currentUserId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UsersLoader>
        </>
    )
}

export default Users
