import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiselectField from '../common/form/multiselectField'
import CheckBoxField from '../common/form/checkBoxField'

const RegisterForm = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
        profession: '',
        sex: 'male',
        qualities: [],
        licence: false
    })

    const [qualities, setQualities] = useState({})

    const [errors, setErrors] = useState({})
    const [professions, setProfession] = useState()

    useEffect(() => {
        api.professions.fetchAll().then((data) => setProfession(data))
        api.qualities.fetchAll().then((data) => setQualities(data))
    }, [])

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: { message: 'Email введён не корректно' }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            },
            isCapitalSymbol: {
                message: 'Пароль должен содеражать хотя бы одну заглавную букву'
            },
            isContainDigit: {
                message: 'Пароль должен содеражать хотя бы одну цифру'
            },
            min: {
                message:
                    'Пароль должен состоять минимум из 8 (восьми) символов',
                value: 8
            }
        },
        profession: {
            isRequired: {
                message: 'Обязательно выберите вашу профессию'
            }
        },
        licence: {
            isRequired: {
                message:
                    'Вы не можете использовать наш сервис без подтверждения лицензионного соглашения'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }

    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                onChange={handleChange}
                name="email"
                value={data.email}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                onChange={handleChange}
                name="password"
                value={data.password}
                error={errors.password}
            />
            <SelectField
                label="Выбери свою профессию"
                options={professions}
                name="professions"
                defaultOption="Choose..."
                error={errors.profession}
                value={data.profession}
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
            <CheckBoxField
                value={data.licence}
                onChange={handleChange}
                name="licence"
                error={errors.licence}
            >
                Подтвердить <a>лицензионное соглашение</a>
            </CheckBoxField>
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
        </form>
    )
}

export default RegisterForm
