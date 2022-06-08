import React from 'react'
import PropTypes from 'prop-types'
import Qualities from './qualities'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
    const { isLoading } = useQualities()
    if (isLoading) return 'Loading...'
    return (
        <>
            {qualities.map((qual) => (
                <Qualities key={qual} id={qual} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
