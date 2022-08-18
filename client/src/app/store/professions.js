import { createSlice } from '@reduxjs/toolkit'
import professionService from '../services/profession.service'

const professionsSlice = createSlice({
    name: 'professions',
    initialState: {
        entities: null,
        isLoading: true,
        error: null,
        lastFetch: null
    },
    reducers: {
        professionsRequested: (state) => {
            state.isLoading = true
        },
        professisonsReceved: (state, action) => {
            state.entities = action.payload
            state.lastFetch = Date.now()
            state.isLoading = false
        },
        professionsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        }
    }
})

const { reducer: professionsReducer, actions } = professionsSlice
const { professionsRequested, professisonsReceved, professionsRequestFiled } =
    actions

function isOutDated(date) {
    if (Date.now() - date > 10 * 60 * 100) {
        return true
    }
    return false
}

export const loadProfessionsList = () => async (dispatch, getState) => {
    const { lastFetch } = getState().professions
    if (isOutDated(lastFetch)) {
        dispatch(professionsRequested())
        try {
            const { content } = await professionService.get()
            dispatch(professisonsReceved(content))
        } catch (error) {
            dispatch(professionsRequestFiled(error.message))
        }
    }
}

export const getProfessions = () => (state) => state.professions.entities
export const getProfessionsLoadingStatus = () => (state) =>
    state.professions.isLoading
export const getProfessionById = (id) => (state) => {
    if (state.professions.entities) {
        return state.professions.entities.find((p) => p._id === id)
    }
}

export default professionsReducer
