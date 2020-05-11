import React from 'react';
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {createControl, validate, validateForm} from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import axios from '../../axios/axios';

function createOptionControls(number) {
    return createControl({
        id: number,
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым'
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'Введите вопрос',
            errorMessage: 'Вопрос не может быть пустым'
        }, {required: true}),
        option1: createOptionControls(1),
        option2: createOptionControls(2),
        option3: createOptionControls(3),
        option4: createOptionControls(4)
    }
}

export default class QuizCreator extends React.Component {

    state = {
        isFormValid: false,
        quiz: [],
        rightAnswerId: 1,
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault()
    };

    addQuestionHandler = () => {
        const quiz = this.state.quiz.concat();
        const index = quiz.length + 1;
        const {question, option1, option2, option3, option4} = this.state.formControls;
        const quizItem = {
            id: index,
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };
        quiz.push(quizItem);
        this.setState({
            quiz,
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        })
    };

    createQuizHandler = async () => {
        try {
            await axios.post('/quizzes.json', this.state.quiz);
            this.setState({
                quiz: [],
                isFormValid: false,
                rightAnswerId: 1,
                formControls: createFormControls()
            })
        } catch (e) {
            console.log(e)
        }
    };

    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls};
        const control = {...formControls[controlName]};
        control.value = value;
        control.touched = true;
        control.valid = validate(control.value, control.validation);
        formControls[controlName] = control;
        let isFormValid = validateForm(formControls);
        this.setState({
            formControls, isFormValid
        })
    };

    renderInputs = () => {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            return (
                <Auxiliary key={controlName + index}>
                    <Input value={control.value}
                           label={control.label}
                           touched={control.touched}
                           valid={control.valid}
                           shouldValidate={!!control.validation}
                           errorMessage={control.errorMessage}
                           onChange={event => this.onChangeHandler(event.target.value, controlName)} />
                    {index === 0 ? <hr/> : null}
                </Auxiliary>
            )
        })
    };

    selectChangeHandler = event => {
        this.setState({rightAnswerId: +event.target.value})
    };

    render() {
        const select = <Select value={this.state.rightAnswerId}
                               label='Выберите правильный вариант ответа'
                               options={[
                                   {text: 1, value: 1},
                                   {text: 2, value: 2},
                                   {text: 3, value: 3},
                                   {text: 4, value: 4},
                               ]}
                               onChange={this.selectChangeHandler} />;
        return (
            <div className={classes.QuizCreator}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        {select}
                        <Button type='primary'
                                onClick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}>Добавить вопрос</Button>
                        <Button type='success'
                                onClick={this.createQuizHandler}
                                disabled={this.state.quiz.length === 0}>Создать тест</Button>
                    </form>
                </div>
            </div>
        )
    }
}