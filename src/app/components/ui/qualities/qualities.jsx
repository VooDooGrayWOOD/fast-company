import React from 'react'
import { useQualities } from '../../../hooks/useQualities'
import PropTypes from 'prop-types'

const Qualities = ({ id }) => {
    const { getQuality } = useQualities()
    const { color, name } = getQuality(id)
    return <span className={'badge m-1 bg-' + color}>{name}</span>
}
Qualities.propTypes = {
    id: PropTypes.string.isRequired
}

export default Qualities
