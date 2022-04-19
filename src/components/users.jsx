import React, { useState, useEffect } from "react";
import { paginate } from "../utils/paginate";
import Pagination from "./pagination";
import api from "../api";
import PropTypes from "prop-types";
import GroupList from "./groupList";
import SearchStatus from "./searchStatus";
import UsersTable from "./usersTable";
import _ from "lodash";

const Users = ({ users: allUsers, ...rest }) => {
    const pageSize = 8;

    const [currentPage, setCurrentPage] = useState(1);
    const [professions, setProfessions] = useState();
    const [selectedProf, setSelectedProf] = useState();
    const [sortBy, setSortBy] = useState({ iter: "name", order: "asc" });

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfessions(data));
    }, []);

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf]);

    const handleProfessionSelect = (item) => {
        setSelectedProf(item);
    };

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    const HandleSort = (item) => {
        setSortBy(item);
    };

    const filteredUsers = selectedProf
        ? allUsers.filter(
            (user) =>
                JSON.stringify(user.profession) ===
                JSON.stringify(selectedProf)
        )
        : allUsers;

    const count = filteredUsers.length;

    const sortedUsers = _.orderBy(filteredUsers, [sortBy.iter], [sortBy.order]);

    const userCrop = paginate(sortedUsers, currentPage, pageSize);

    const clearFilter = () => {
        setSelectedProf();
    };

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
                {count > 0 && (
                    <UsersTable
                        users={userCrop}
                        onSort={HandleSort}
                        selectedSort={sortBy}
                        {...rest}
                    />
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
    );
};

Users.propTypes = {
    users: PropTypes.oneOfType([PropTypes.object, PropTypes.array])
};

export default Users;
