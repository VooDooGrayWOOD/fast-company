import React, {useState} from "react";
import Users from "./components/users";
import SearchStatus from "./components/searchStatus";
import API from "./api/index";

const App = () => {
    const [users, setUsers] = useState(API.users.fetchAll());
    
    const handleDelete = (userId) => {
        setUsers(users.filter(user => user._id !== userId))
    };

    const handleToggleBookMark = (id) => {
        const newUsers = [...users];
        let usersIndex = users.findIndex(user => user._id === id);
        const status = users[usersIndex].bookmark === false ? true : false;
        newUsers[usersIndex].bookmark = status;
        setUsers(newUsers);
    }

    return (
        <>
            <SearchStatus length={users.length}/>
            <table className="table">
            <thead>
                <tr>
                    <th scope="col">Имя</th>
                    <th scope="col">Качества</th>
                    <th scope="col">Профессия</th>
                    <th scope="col">Встретился, раз</th>
                    <th scope="col">Избранное</th>
                    <th scope="col">Оценка</th>
                </tr>
            </thead>
                <tbody>
                    <Users users={users} onToggleBookMark={handleToggleBookMark} onDelete={handleDelete} />
                </tbody>
            </table>
        </>
    );
};

export default App;
