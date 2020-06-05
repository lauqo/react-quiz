import React from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuizzes} from '../../store/actions/quiz'
import {LocaleContext} from '../../context/LocaleContext'
import {translate} from '../../i18nConfig/translate'

class QuizList extends React.Component {

    renderQuizzes() {
        return this.props.quizzes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{translate(this.context.locale, 'quiz')+ ' ' + quiz.name}</NavLink>
                </li>
            )
        })
    };

    componentDidMount() {
        this.props.fetchQuizzes();
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>{translate(this.context.locale, 'quiz_list')}</h1>
                    {this.props.loading
                        ? <Loader />
                        : <ul>
                            {this.renderQuizzes()}
                          </ul>
                    }
                </div>
            </div>
        )
    }
}

QuizList.contextType = LocaleContext

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        quizzes: state.quiz.quizzes
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizzes: () => dispatch(fetchQuizzes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(QuizList)