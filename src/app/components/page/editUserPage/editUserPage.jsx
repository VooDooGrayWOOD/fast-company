import React, { useEffect, useState } from 'react'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiselectField from '../../common/form/multiSelectField'
import { useHistory, useParams } from 'react-router-dom'
import api from '../../../api'

const EditUser = () => {
    const history = useHistory()
    const params = useParams()

    const { usersId } = params
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: ''
    })

    const [qualities, setQualities] = useState({})
    const [profession, setProfession] = useState([])

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
        api.users.getById(usersId).then(({ profession, qualities, ...data }) =>
            setData((prevState) => ({
                ...prevState,
                ...data,
                qualities: transformData(qualities),
                profession: profession._id
            }))
        )
    }, [])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleAllUsers = () => {
        history.replace(`/users/page/${usersId}`)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const { profession, qualities } = data
        api.users.update(usersId, {
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
        handleAllUsers()
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    {Object.keys(profession).length > 0 ? (
                        <form onSubmit={handleSubmit}>
                            <TextField
                                label="Имя"
                                onChange={handleChange}
                                name="name"
                                value={data.name}
                            />
                            <TextField
                                label="Электронная почта"
                                onChange={handleChange}
                                name="email"
                                value={data.email}
                            />
                            <SelectField
                                label="Выбери свою профессию"
                                options={profession}
                                name="profession"
                                defaultOption="Choose..."
                                defaultValue={data.profession}
                                onChange={handleChange}
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
