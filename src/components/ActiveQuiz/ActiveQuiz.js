import React from 'react'
import classes from './ActiveQuiz.css'
import AnswerList from './AnswerList/AnswerList'

const ActiveQuiz = props => (
    <div className={classes.ActiveQuiz}>
        <p className={classes.Question}>
            <span>
                <strong>{props.quizNumber}.</strong>&nbsp;
                {props.question}
            </span>
            <small>{props.quizNumber} из {props.quizLength}</small>
        </p>
        <AnswerList answers={props.answers}
                    state={props.state}
                    onAnswerClick={props.onAnswerClick} />
    </div>
);

export default ActiveQuiz