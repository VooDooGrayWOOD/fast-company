import React from "react";
import PropTypes from "prop-types";

const BookMark = ({ status, ...rest }) => {
    const result = status === false ? "" : "-fill";

    return (
        <div className="d-grid gap-2 col-4 mx-auto">
            {
                <button
                    {...rest}
                    className={`btn btn-outline-success btn-sm bi bi-clipboard-heart${result}`}
                ></button>
            }
        </div>
    );
};

BookMark.propTypes = {
    status: PropTypes.bool.isRequired
};

export default BookMark;
