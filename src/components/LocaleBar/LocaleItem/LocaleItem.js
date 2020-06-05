import React, {useContext} from 'react'
import classes from './LocaleItem.css'
import {LocaleContext} from '../../../context/LocaleContext'

export const LocaleItem = ({language}) => {

    const {locale, setLocale} = useContext(LocaleContext)

    const cls = [classes.LocaleItem]

    if (locale === language) {
        cls.push(classes.active)
    }

    return (
        <li className={cls.join(' ')} onClick={() => setLocale(language)}>
            {language}
        </li>
    )
}