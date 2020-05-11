import React from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import axios from 'axios'

export default class Auth extends React.Component {

    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: '',
                type: 'email',
                label: 'Email',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    email: true,
                },
                errorMessage: 'Введите корректный email'
            },
            password: {
                value: '',
                type: 'password',
                label: 'Пароль',
                touched: false,
                valid: false,
                validation: {
                    required: true,
                    minLength: 6
                },
                errorMessage: 'Введите корректный пароль'
            }
        }
    };

    isControlValid(value, validation) {
        let isValid = true;
        if (!validation) {
            return true
        }
        if (validation.required) {
            isValid = value.trim() !== ''
        }
        if (validation.email) {
            isValid = isValid && is.email(value)
        }
        if (validation.minLength) {
            isValid = isValid && value.length >= validation.minLength
        }
        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = event.target.value;
        control.touched = true;
        control.valid = this.isControlValid(control.value, control.validation);
        formControls[controlName] = control;
        let isFormValid = true;
        Object.keys(formControls).forEach(name => {
            isFormValid = isFormValid && formControls[name].valid
        });
        this.setState({
            formControls, isFormValid
        })
    };

    renderInputs() {
        return Object.keys(this.state.formControls)
            .map((controlName, index) => {
                const control = this.state.formControls[controlName];
                return (
                    <Input key={controlName+index}
                           value={control.value}
                           type={control.type}
                           label={control.label}
                           touched={control.touched}
                           valid={control.valid}
                           shouldValidate={!!control.validation}
                           errorMessage={control.errorMessage}
                           onChange={event => this.onChangeHandler(event, controlName)} />
                )
            })
    }

    loginHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDRW_afnJfRmkyFJxPEpu82Gpcf7BrJD1M', authData);
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    registerHandler = async () => {
        const authData = {
            email: this.state.formControls.email.value,
            password: this.state.formControls.password.value,
            returnSecureToken: true
        };
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDRW_afnJfRmkyFJxPEpu82Gpcf7BrJD1M', authData);
            console.log(response.data)
        } catch (e) {
            console.log(e)
        }
    };

    submitHandler = event => {
        event.preventDefault()
    };

    render() {
        return (
            <div className={classes.Auth}>
                <div>
                    <h1>Авторизация</h1>
                    <form onSubmit={this.submitHandler} className={classes.AuthForm}>
                        {this.renderInputs()}
                        <Button type='success'
                                onClick={this.loginHandler}
                                disabled={!this.state.isFormValid}>Войти</Button>
                        <Button type='primary'
                                onClick={this.registerHandler}
                                disabled={!this.state.isFormValid}>Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        )
    }
}