import React, { useState, useEffect } from 'react'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import api from '../api'
import PropTypes from 'prop-types'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersList from './usersList'
import UserPage from './userPage'
import { useParams } from 'react-router-dom'
import _ from 'lodash'

const Users = () => {
    const pageSize = 8
    const params = useParams()
    const { userId } = params

    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfessions] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })

    const [users, setUsers] = useState()

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookMark = (id) => {
        const newUsers = [...users]
        const usersIndex = users.findIndex((user) => user._id === id)
        const status = users[usersIndex].bookmark === false
        newUsers[usersIndex].bookmark = status
        setUsers(newUsers)
    }

    const HandleSort = (item) => {
        setSortBy(item)
    }

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )

        const count = filteredUsers.length

        const userCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />

                    {userId ? (
                        <UserPage users={users} id={userId} />
                    ) : (
                        <>
                            {count > 0 && (
                                <UsersList
                                    // users={users}
                                    users={userCrop}
                                    onSort={HandleSort}
                                    selectedSort={sortBy}
                                    onDelete={handleDelete}
                                    onToggleBookMark={handleToggleBookMark}
                                />
                            )}
                        </>
                    )}
                    <div className="d-flex justify-content-center">
                        {count && (
                            <Pagination
                                itemsCount={count}
                                pageSize={pageSize}
                                currentPage={currentPage}
                                onPageChange={handlePageChange}
                            />
                        )}
                    </div>
                </div>
            </div>
        )
    }
    return 'loading...'
}

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
}

export default Users
