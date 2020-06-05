import {messages} from './messages'

export const translate = (locale, id) => {
    return messages[locale][id]
}