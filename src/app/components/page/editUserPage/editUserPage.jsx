import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiselectField from '../../common/form/multiSelectField'
import { useHistory, useParams } from 'react-router-dom'
import { validator } from '../../../utils/validator'
import BackHistoryButton from '../../common/backButton'
import { useProfessions } from '../../../hooks/useProfession'
import { useQualities } from '../../../hooks/useQualities'
import { useAuth } from '../../../hooks/useAuth'

const EditUserPage = () => {
    const { changeUserData } = useAuth()
    const history = useHistory()
    const params = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const { userId } = params
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })

    const [errors, setErrors] = useState({})
    const { professions } = useProfessions()
    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }))

    const { qualities } = useQualities()
    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }))

    useEffect(() => {
        if (data._id) setIsLoading(false)
    }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Введите ваше имя'
            }
        }
    }

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    useEffect(() => {
        validate()
    }, [data])

    const isValid = Object.keys(errors).length === 0

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleAllUsers = () => {
        history.replace(`/users/${userId}`)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        await changeUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        })
        handleAllUsers()
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            onChange={handleChange}
                            name="name"
                            value={data.name}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            onChange={handleChange}
                            name="email"
                            value={data.email}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            options={professionsList}
                            name="profession"
                            defaultOption="Choose..."
                            value={data.profession}
                            onChange={handleChange}
                            error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: 'Male', value: 'male' },
                                { name: 'Female', value: 'female' },
                                { name: 'Other', value: 'other' }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiselectField
                            options={qualitiesList}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditUserPage
