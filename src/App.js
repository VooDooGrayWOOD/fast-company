import React, { useState } from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import API from "./api/index";

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const newUsers = [...users];
        let usersIndex = users.findIndex((user) => user._id === id);
        const status = users[usersIndex].bookmark === false ? true : false;
        newUsers[usersIndex].bookmark = status;
        setUsers(newUsers);
    };

    return (
        <>
            <SearchStatus length={users.length} />
            <Users
                users={users}
                onToggleBookMark={handleToggleBookMark}
                onDelete={handleDelete}
            />
        </>
    );
};

export default App;
