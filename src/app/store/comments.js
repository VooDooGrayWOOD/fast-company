import { createAction, createSlice } from '@reduxjs/toolkit'
import commentService from '../services/comment.service'
import { nanoid } from 'nanoid'
import { getCurrentUserId } from './users'

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
        commentsReceived: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        commentsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        commentsCreated: (state, action) => {
            state.entities.push(action.payload)
        },
        commentRemove: (state, action) => {
            state.entities = state.entities.filter(
                (n) => n._id !== action.payload
            )
        }
    }
})

const { reducer: commentsReducer, actions } = commentsSlice
const {
    commentsRequested,
    commentsReceived,
    commentsRequestFiled,
    commentsCreated,
    commentRemove
} = actions

const createCommentsRequested = createAction(
    '/comments/createCommentsRequested'
)
const createCommentsFailed = createAction('/comments/createCommentsFailed')

export const createComments = (payload) => async (dispatch, getState) => {
    dispatch(createCommentsRequested())
    try {
        const comment = {
            ...payload,
            _id: nanoid(),
            created_at: Date.now(),
            userId: getCurrentUserId()(getState())
        }
        const { content } = await commentService.createComment(comment)
        console.log(content)
        dispatch(commentsCreated(content))
    } catch (error) {
        dispatch(createCommentsFailed(error.message))
    }
}

export const deleteComment = (payload) => async (dispatch) => {
    try {
        const { content } = await commentService.removeComment(payload)
        dispatch(commentRemove(content))
    } catch (error) {}
}

export const loadCommentsList = (userId) => async (dispatch) => {
    dispatch(commentsRequested())
    try {
        const { content } = await commentService.getComments(userId)
        dispatch(commentsReceived(content))
    } catch (error) {
        dispatch(commentsRequestFiled(error.message))
    }
}

export const getComments = () => (state) => state.comments.entities
export const getCommentsLoadingStatus = () => (state) =>
    state.comments.isLoading

export default commentsReducer
