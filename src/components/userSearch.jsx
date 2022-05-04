import React, { useState } from 'react'
import TableBody from './tableBody'

const UserSearch = ({ users, data, columns }) => {
    const [value, setValue] = useState({ search: '' })

    const handleChange = ({ target }) => {
        setValue((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    console.log(value.search)
    const filteredUsers = users.filter((user) => {
        return user.name.toLowerCase().includes(value.search.toLowerCase())
    })
    console.log(filteredUsers)

    return (
        <>
            <form action="">
                <label htmlFor="search"></label>
                <input
                    // type="search"
                    name="search"
                    value={value.search}
                    placeholder="Search..."
                    className="w-100 mx-auto"
                    onChange={handleChange}
                />
            </form>
            <div>
                {filteredUsers.map((user, _id) => {
                    return
                })}
            </div>
        </>
    )
}

export default UserSearch
