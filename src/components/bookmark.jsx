import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, user, onToggleBookMark }) => {
    const result = status === false ? "" : "-fill";

    return (
        <div className="d-grid gap-2 col-4 mx-auto">
            {
                <button
                    className={`btn btn-outline-success btn-sm bi bi-clipboard-heart${result}`}
                    onClick={() => onToggleBookMark(user._id)}
                ></button>
            }
        </div>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired
};

export default BookMark;
