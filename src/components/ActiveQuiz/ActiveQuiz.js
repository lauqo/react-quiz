import React, {useContext} from 'react'
import classes from './ActiveQuiz.css'
import AnswerList from './AnswerList/AnswerList'
import {LocaleContext} from '../../context/LocaleContext'
import {translate} from '../../i18nConfig/translate'

const ActiveQuiz = props => {
    const {locale} = useContext(LocaleContext)
    return (
        <div className={classes.ActiveQuiz}>
            <p className={classes.Question}>
            <span>
                <strong>{props.quizNumber}.</strong>&nbsp;
                {props.question}
            </span>
                <small>{props.quizNumber} {translate(locale, 'out_of')} {props.quizLength}</small>
            </p>
            <AnswerList answers={props.answers}
                        state={props.state}
                        onAnswerClick={props.onAnswerClick} />
        </div>
    )
}

export default ActiveQuiz