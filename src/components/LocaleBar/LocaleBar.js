import React, {useContext} from 'react'
import classes from './LocaleBar.css'
import {LocaleItem} from './LocaleItem/LocaleItem'
import {LocaleContext} from '../../context/LocaleContext'

export const LocaleBar = () => {
    const {locales} = useContext(LocaleContext)
    return (
        <ul className={classes.LocaleBar}>
            {locales.map(lang => <LocaleItem language={lang} key={lang} />)}
        </ul>
    )
}