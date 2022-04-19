import React from "react";
import PropTypes from "prop-types";

const SearchStatus = ({ length }) => {
    return length === 0 ? (<h2>
            <span className="badge bg-danger">
                {"Никто с тобой не тусанет"}
            </span>
        </h2>
    ) : length > 4 || length === 1 ? (
        <h2>
            <span className="badge bg-primary">
                {length} {"человек тусанет"} {"с тобой сегодня"}
            </span>
        </h2>
    ) : (
        <h2>
            <span className="badge bg-primary">
                {length} {"человека тусанет"} {"с тобой сегодня"}
            </span>
        </h2>
    );
};

SearchStatus.propTypes = {
    length: PropTypes.number.isRequired
};

export default SearchStatus;
