import React, {useContext} from 'react'
import classes from './Finish.css'
import Button from '../UI/Button/Button'
import {Link} from 'react-router-dom'
import {LocaleContext} from '../../context/LocaleContext'
import {translate} from '../../i18nConfig/translate'

const Finish = props => {
    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total;
    }, 0);
    const {locale} = useContext(LocaleContext)
    return (
        <div className={classes.Finish}>
            <ul>
                {props.quiz.map((quizItem, index) => {
                    const cls = [
                        'fa',
                        props.results[quizItem.id] === 'error' ? 'fa-times' : 'fa-check',
                        classes[props.results[quizItem.id]]
                        ];
                    return (
                        <li key={index}>
                            <strong>{index + 1}.</strong>&nbsp;
                            {quizItem.question}
                            <i className={cls.join(' ')} />
                        </li>
                    )
                })}
            </ul>
            <p>{translate(locale, 'correct_answers')} {successCount} {translate(locale, 'out_of')} {props.quiz.length}</p>
            <div>
                <Button onClick={props.onRetry} type="primary">{translate(locale, 'retry')}</Button>
                <Link to="/">
                    <Button type="success">{translate(locale, 'go_to_quiz_list')}</Button>
                </Link>
            </div>
        </div>
    )
};

export default Finish