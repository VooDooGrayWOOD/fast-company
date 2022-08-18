import React from 'react'
import PropTypes from 'prop-types'
import Qualities from './qualities'
import { useSelector } from 'react-redux'
import {
    getQualitiesByIds,
    getQualitiesLoadingStatus
} from '../../../store/qualities'

const QualitiesList = ({ qualities }) => {
    // const dispatch = useDispatch
    const isLoading = useSelector(getQualitiesLoadingStatus())
    const qualitiesList = useSelector(getQualitiesByIds(qualities))

    if (isLoading) return 'Loading...'

    return (
        <>
            {qualitiesList.map((qual) => (
                <Qualities key={qual._id} {...qual} />
            ))}
        </>
    )
}

QualitiesList.propTypes = {
    qualities: PropTypes.array.isRequired
}

export default QualitiesList
