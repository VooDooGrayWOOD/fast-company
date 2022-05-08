import React from 'react'
import PropTypes from 'prop-types'
import Qualities from './qualities'

const QualitiesList = ({ qualities }) => {
    return (
        <>
            {qualities.map((qual) => (
                <Qualities
                    key={qual._id}
                    color={qual.color}
                    name={qual.name}
                    _id={qual._id}
                />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
