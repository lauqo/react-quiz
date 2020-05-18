import React, {Component} from 'react'
import Layout from './hoc/Layout/Layout'
import Auth from './containers/Auth/Auth'
import Quiz from './containers/Quiz/Quiz'
import QuizCreator from './containers/QuizCreator/QuizCreator'
import QuizList from './containers/QuizList/QuizList'
import {Redirect, Route, Switch, withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import Logout from './components/Logout/Logout'

class App extends Component {

    render() {
        let routes = (
            <Switch>
                <Route path='/auth' component={Auth} />
                <Route path='/quiz/:id' component={Quiz} />
                <Route path='/' exact component={QuizList} />
                <Redirect to='/' />
            </Switch>
        );
        if (this.props.isAuthenticated) {
            routes = (
                <Switch>
                    <Route path='/quiz-creator' component={QuizCreator} />
                    <Route path='/quiz/:id' component={Quiz} />
                    <Route path='/logout' component={Logout} />
                    <Route path='/' exact component={QuizList} />
                    <Redirect to='/' />
                </Switch>
            )
        }
        return (
            <Layout>
                {routes}
            </Layout>
        );
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: !!state.auth.token
    }
}

export default withRouter(connect(mapStateToProps)(App));
