import React, {useState} from 'react'
import {messages} from '../i18nConfig/messages'
import {LocaleContext} from './LocaleContext'

export const LocaleState = ({children}) => {
    const locales = Object.keys(messages)
    const [locale, setLocale] = useState(locales[0])
    return (
        <LocaleContext.Provider value={{locale, setLocale, locales}}>
            {children}
        </LocaleContext.Provider>
    )
}