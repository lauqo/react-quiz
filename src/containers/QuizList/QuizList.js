import React from 'react'
import classes from './QuizList.css'
import {NavLink} from 'react-router-dom'
import Loader from '../../components/UI/Loader/Loader'
import axios from '../../axios/axios'

export default class QuizList extends React.Component {

    state = {
        loading: true,
        quizzes: []
    };

    renderQuizzes() {
        return this.state.quizzes.map(quiz => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    };

    async componentDidMount() {
        try {
            const response = await axios.get('/quizzes.json');
            const quizzes = [];
            Object.keys(response.data).forEach((key, index) => {
                quizzes.push({
                    id: key, name: `Тест №${index + 1}`
                })
            });
            this.setState({
                quizzes, loading: false
            })
        } catch (e) {
            console.log(e)
        }
    }

    render() {
        return (
            <div className={classes.QuizList}>
                <div>
                    <h1>Список тестов</h1>
                    {this.state.loading
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