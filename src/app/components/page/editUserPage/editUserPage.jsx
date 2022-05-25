import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiselectField from '../../common/form/multiSelectField'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../api'
import { validator } from '../../../utils/validator'
import BackHistoryButton from '../../common/backButton'

const EditUser = () => {
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

    const [qualities, setQualities] = useState([])
    const [profession, setProfession] = useState([])
    const [errors, setErrors] = useState({})

    const getProfessionById = (id) => {
        for (const prof of profession) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }
    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    const transformData = (data) => {
        return data.map((qual) => ({ label: qual.name, value: qual._id }))
    }

    useEffect(() => {
        setIsLoading(true)
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfession(professionsList)
        })
        api.users.getById(userId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        )
    }, [userId])

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
    useEffect(() => {
        validate()
    }, [])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
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

    const handleSubmit = (e) => {
        e.preventDefault()
        const { profession, qualities } = data
        api.users.update(userId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
        handleAllUsers()
    }

    return (
        <div className="container mt-5">
            <BackHistoryButton />
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {!isLoading && Object.keys(profession).length > 0 ? (
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
                                options={profession}
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
                                options={qualities}
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
                    ) : (
                        'Loading...'
                    )}
                </div>
            </div>
        </div>
    )
}

export default EditUser
