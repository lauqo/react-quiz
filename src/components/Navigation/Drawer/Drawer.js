import React, {Component} from 'react'
import classes from './Drawer.css'
import {NavLink} from 'react-router-dom'
import Backdrop from '../../UI/Backdrop/Backdrop'
import {LocaleContext} from '../../../context/LocaleContext'
import {translate} from '../../../i18nConfig/translate'

class Drawer extends Component {

    clickHandler = () => {
        this.props.onClose()
    };

    renderLinks(links) {
        return links.map((link, index) => {
            return (
                <li key={index}>
                    <NavLink to={link.to}
                             exact={link.exact}
                             activeClassName={classes.active}
                             onClick={this.clickHandler}>{link.label}
                    </NavLink>
                </li>
            )
        })
    }

    render() {
        const cls = [classes.Drawer];
        if (!this.props.isOpen) {
            cls.push(classes.close)
        }
        const {locale} = this.context
        const links = [
            {to: '/', label: translate(locale, 'list'), exact: true},
        ];
        if (this.props.isAuthenticated) {
            links.push({to: '/quiz-creator', label: translate(locale, 'create_quiz'), exact: false});
            links.push({to: '/logout', label: translate(locale, 'sign_out'), exact: false})
        } else {
            links.push(
                {to: '/auth', label: translate(locale, 'sign_in'), exact: false}
            )
        }
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {this.renderLinks(links)}
                    </ul>
                </nav>
                {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/> : null}
            </React.Fragment>
        )
    }
}

Drawer.contextType = LocaleContext

export default Drawer