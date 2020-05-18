import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import Finish from '../../components/Finish/Finish'
import Loader from '../../components/UI/Loader/Loader'
import {connect} from 'react-redux'
import {fetchQuiz, onAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuiz(this.props.match.params.id)
    }

    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.props.loading || !this.props.quiz
                        ? <Loader/>
                        : this.props.isFinished
                            ? <Finish
                                quiz={this.props.quiz}
                                results={this.props.results}
                                onRetry={this.props.retryQuiz} />
                            : <ActiveQuiz
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                                quizNumber={this.props.activeQuestion + 1}
                                quizLength={this.props.quiz.length}
                                state={this.props.answerState}
                                onAnswerClick={this.props.onAnswerClick} />
                    }
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.quiz.loading,
        isFinished: state.quiz.isFinished,
        results: state.quiz.results,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuiz: (id) => dispatch(fetchQuiz(id)),
        retryQuiz: () => dispatch(retryQuiz()),
        onAnswerClick: id => dispatch(onAnswerClick(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz)