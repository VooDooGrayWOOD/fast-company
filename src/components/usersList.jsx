import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { paginate } from '../utils/paginate'
import Pagination from './pagination'
import api from '../api'
import GroupList from './groupList'
import SearchStatus from './searchStatus'
import UsersTable from './usersTable'
import _ from 'lodash'
const UsersList = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [professions, setProfession] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const pageSize = 8

    const [value, setValue] = useState({ search: '' })

    const [users, setUsers] = useState()

    const handleChange = ({ target }) => {
        setValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
        if (!value.search) {
            setSelectedProf()
            setCurrentPage(1)
        }
    }

    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }

    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        setUsers(newArray)
    }

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf])

    const handleProfessionSelect = (item) => {
        setSelectedProf(item)
        value.search = ''
    }

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }
    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        const filteredUsers = selectedProf
            ? users.filter(
                  (user) =>
                      JSON.stringify(user.profession) ===
                      JSON.stringify(selectedProf)
              )
            : users

        const filteredUsersName = filteredUsers.filter((user) => {
            return user.name.toLowerCase().includes(value.search.toLowerCase())
        })
        // console.log(filteredUsersName)

        const count = filteredUsersName.length

        const sortedUsers = _.orderBy(
            filteredUsersName,
            [sortBy.path],
            [sortBy.order]
        )
        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

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
                            {' '}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <form action="">
                        <input
                            name="search"
                            value={value.search}
                            placeholder="Search..."
                            className="w-100 mx-auto"
                            onChange={handleChange}
                        />
                    </form>
                    {count > 0 && (
                        <UsersTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return 'loading...'
}
UsersList.propTypes = {
    users: PropTypes.array
}

export default UsersList
