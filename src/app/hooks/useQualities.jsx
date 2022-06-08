import React, { useContext, useEffect, useState } from 'react'
import qualityService from '../services/qualities.service'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types'

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(true)
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    useEffect(() => {
        const getQualities = async () => {
            try {
                const { content } = await qualityService.get()
                setQualities(content)
                setIsLoading(false)
            } catch (error) {
                errorCatcher(error)
            }
        }
        getQualities().then()
    }, [])

    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id)
    }

    return (
        <QualitiesContext.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualitiesContext.Provider>
    )
}
QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
