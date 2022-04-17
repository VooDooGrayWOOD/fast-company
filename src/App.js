import React, { useState, useEffect } from "react";
import Users from "./components/users";
import API from "./api/index";

const App = () => {
    const [users, setUsers] = useState();

    useEffect(() => {
        API.users.fetchAll().then((data) => setUsers(data));
    }, []);

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId));
    };

    const handleToggleBookMark = (id) => {
        const newUsers = [...users];
        const usersIndex = users.findIndex((user) => user._id === id);
        const status = users[usersIndex].bookmark === false;
        newUsers[usersIndex].bookmark = status;
        setUsers(newUsers);
    };

    return (
        <>
            {users && (
                <Users
                    users={users}
                    onToggleBookMark={handleToggleBookMark}
                    onDelete={handleDelete}
                />
            )}
        </>
    );
};

export default App;
