import React from 'react'
import PropTypes from 'prop-types'

const Qualities = ({ _id, color, name }) => {
    return (
        <span className={'badge m-1 bg-' + color} key={_id}>
            {name}
        </span>
    )
}
Qualities.propTypes = {
    _id: PropTypes.string,
    color: PropTypes.string,
    name: PropTypes.string
}

export default Qualities
