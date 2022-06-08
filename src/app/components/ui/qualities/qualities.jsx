import React from 'react'
import { useQualities } from '../../../hooks/useQualities'
import PropTypes from 'prop-types'

const Qualities = ({ qualities }) => {
    console.log(qualities)
    const { isLoading, getQuality } = useQualities()
    const qual = getQuality()
    // console.log(qual)

    // if (!isLoading) {
    //     return <span className={'badge m-1 bg-' + color}>{qual.name}</span>
    // } else return 'Loading ...'
    return null
}

Qualities.propTypes = {
    id: PropTypes.string
}

export default Qualities
