import React, {Component} from 'react'
import classes from './Quiz.css'
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import Finish from '../../components/Finish/Finish'
import Loader from '../../components/UI/Loader/Loader'
import axios from '../../axios/axios'

class Quiz extends Component {

    state = {
        loading: true,
        isFinished: false,
        results: [],
        activeQuestion: 0,
        answerState: null,
        quiz: []
    };

    onAnswerClickHandler = answerId => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0];
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion];
        const results = this.state.results;
        if (answerId === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({
                answerState: {[answerId]: 'success'},
                results
            });
            const timeOut = window.setTimeout(() => {
                if (this.isQuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({
                        activeQuestion: this.state.activeQuestion + 1,
                        answerState: null
                    })
                }
                window.clearTimeout(timeOut)
            }, 1000)
        } else {
            results[question.id] = 'error';
            this.setState({
                answerState: {[answerId]: 'error'},
                results
            })
        }
    };

    isQuizFinished() {
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    retryHandler = () => {
        this.setState({
            isFinished: false,
            results: [],
            activeQuestion: 0,
            answerState: null,
        })
    };

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizzes/${this.props.match.params.id}.json`);
            const quiz = response.data;
            this.setState({
                quiz, loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.loading
                        ? <Loader/>
                        : this.state.isFinished
                            ? <Finish
                                quiz={this.state.quiz}
                                results={this.state.results}
                                onRetry={this.retryHandler} />
                            : <ActiveQuiz
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                                quizNumber={this.state.activeQuestion + 1}
                                quizLength={this.state.quiz.length}
                                state={this.state.answerState}
                                onAnswerClick={this.onAnswerClickHandler} />
                    }
                </div>
            </div>
        )
    }
}

export default Quiz