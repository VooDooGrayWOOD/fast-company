import React from 'react'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../../store/users'

const UserCard = ({ user }) => {
    const currentUserId = useSelector(getCurrentUserId())
    const history = useHistory()
    const handleClick = () => {
        history.push(history.location.pathname + '/edit')
    }
    return (
        <div className="card mb-3">
            <div className="card-body">
                {currentUserId === user._id && (
                    <button
                        className="position-absolute top-0 end-0 btn btn-light btn-sm"
                        onClick={handleClick}
                    >
                        <i className="bi bi-gear" />
                    </button>
                )}
                <div className="d-flex flex-column align-items-center text-center position-relative">
                    <img
                        src={user.image}
                        className="rounded-circle shadow-1-strong me-3"
                        alt="avatar"
                        width="150"
                    />
                    <div className="mt-3">
                        <h4>{user.name}</h4>
                        <p className="text-secondary mb-1">
                            {user.profession.name}
                        </p>
                        <div className="text-muted">
                            <i
                                className="bi bi-caret-down-fill text-primary"
                                role="button"
                            />
                            <i
                                className="bi bi-caret-up text-secondary"
                                role="button"
                            />
                            <span className="ms-2">{user.rate}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    user: PropTypes.object
}

export default UserCard
