import React from "react";
import Qualitie from "./qualitie";
import BookMark from "./bookmark";
import PropTypes from "prop-types";

const User = ({ user, onDelete, ...rest }) => {
    return (
        <>
            <tr>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((quality) => (
                        <Qualitie
                            key={quality._id}
                            color={quality.color}
                            name={quality.name}
                            _id={quality._id}
                        />
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>
                    <BookMark
                        key={user._id}
                        user={user}
                        status={user.bookmark}
                        {...rest}
                    />
                </td>
                <td>{user.rate}</td>
                <td>
                    <button
                        className="btn btn-danger btn-sm m-2"
                        onClick={() => onDelete(user._id)}
                    >
                        Delete
                    </button>
                </td>
            </tr>
        </>
    );
};

User.propTypes = {
    user: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default User;
