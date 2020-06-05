import React from 'react';
import classes from './QuizCreator.css'
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Select from '../../components/UI/Select/Select';
import {createControl, validate, validateForm} from '../../form/formFramework';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {connect} from 'react-redux'
import {addQuizItem, createQuiz} from '../../store/actions/quizCreate'
import {translate} from '../../i18nConfig/translate'
import {LocaleContext} from '../../context/LocaleContext'

function createOptionControls(number) {
    return createControl({
        id: number,
        label: 'option',
        errorMessage: 'empty_value_error'
    }, {required: true})
}

function createFormControls() {
    return {
        question: createControl({
            label: 'enter_question',
            errorMessage: 'empty_question_error'
        }, {required: true}),
        option1: createOptionControls(1),
        option2: createOptionControls(2),
        option3: createOptionControls(3),
        option4: createOptionControls(4)
    }
}

class QuizCreator extends React.Component {

    state = {
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls()
    };

    submitHandler = event => {
        event.preventDefault()
    };

    addQuestionHandler = () => {
        const {question, option1, option2, option3, option4} = this.state.formControls;
        const quizItem = {
            id: this.props.quiz.length + 1,
            question: question.value,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        };
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
        this.props.addQuizItem(quizItem);
    };

    createQuizHandler = () => {
        this.setState({
            isFormValid: false,
            rightAnswerId: 1,
            formControls: createFormControls()
        });
        this.props.createQuiz();
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
        const locale = this.context.locale
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName];
            const label = translate(locale, control.label) + (index === 0 ? '' : ` ${control.id}`)
            return (
                <Auxiliary key={controlName + index}>
                    <Input value={control.value}
                           label={label}
                           touched={control.touched}
                           valid={control.valid}
                           shouldValidate={!!control.validation}
                           errorMessage={translate(locale, control.errorMessage)}
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
        const locale = this.context.locale
        const select = <Select value={this.state.rightAnswerId}
                               label={translate(locale, 'select_right_answer')}
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
                    <h1>{translate(locale, 'quiz_creation')}</h1>
                    <form onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        {select}
                        <Button type='primary'
                                onClick={this.addQuestionHandler}
                                disabled={!this.state.isFormValid}>{translate(locale, 'add_question')}</Button>
                        <Button type='success'
                                onClick={this.createQuizHandler}
                                disabled={this.props.quiz.length === 0}>{translate(locale, 'create_quiz')}</Button>
                    </form>
                </div>
            </div>
        )
    }
}

QuizCreator.contextType = LocaleContext

function mapStateToProps(state) {
    return {
        quiz: state.quizCreator.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addQuizItem: item => dispatch(addQuizItem(item)),
        createQuiz: () => dispatch(createQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizCreator)