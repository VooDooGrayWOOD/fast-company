import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'

const commentsSlice = createSlice({
    name: 'comments',
    initialState: {
        entities: null,
        isLoading: true,
        error: null
    },
    reducers: {
        commentsRequested: (state) => {
            state.isLoading = true
        },
        commentsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentsCreated: (state, action) => {
            if (!Array.isArray(state.entities)) {
                state.entities = []
            }
            state.entities.push(action.payload)
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceved,
    commentsRequestFiled,
    commentsCreated
} = actions

const createCommentsRequested = createAction('/users/createCommentsRequested')
const createCommentsFailed = createAction('/users/createCommentsFailed')

export const createComments = (userId) => async (dispatch) => {
    dispatch(createCommentsRequested())
    try {
        const { content } = await commentService.createComment(userId)
        console.log(content)
        dispatch(commentsCreated(content))
    } catch (error) {
        dispatch(createCommentsFailed(error.message))
    }
}
export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceved(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
