import React from 'react'
import PropTypes from 'prop-types'

const BookMark = ({ status, ...rest }) => {
    // const result = status === false ? '' : '-fill'

    return (
        <div className="d-grid gap-2 col-4 mx-auto">
            {
                <button
                    {...rest}
                    className={
                        'btn btn-outline-success btn-sm bi bi-clipboard-heart' +
                        (status ? '-fill' : '')
                    }
                ></button>
            }
        </div>
    )
}

BookMark.propTypes = {
    status: PropTypes.bool
}

export default BookMark
