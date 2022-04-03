import React from "react";

const BookMark = ({ status, user, onToggleBookMark}) => {
    const result = status === false ? "" : "-fill";
    
        return (
            <div className="d-grid gap-2 col-4 mx-auto">
                    {<button className={`btn btn-outline-success btn-sm bi bi-clipboard-heart${result}`} onClick={() => onToggleBookMark(user._id)}></button>}
            </div>
    )
};

export default BookMark;
