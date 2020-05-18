import React from 'react'
import classes from './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from '../../components/UI/Input/Input'
import is from 'is_js'
import {connect} from 'react-redux'
import {authorize} from '../../store/actions/auth'

class Auth extends React.Component {

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

    loginHandler = () => {
        this.props.signIn(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            true
        )
    };

    registerHandler = () => {
        this.props.signIn(
            this.state.formControls.email.value,
            this.state.formControls.password.value,
            false
        )
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

function mapDispatchToProps(dispatch) {
    return {
        signIn: (email, password) => dispatch(authorize(email, password, true)),
    }
}

export default connect(null, mapDispatchToProps)(Auth)