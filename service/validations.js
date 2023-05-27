import { body } from 'express-validator'

export const registration = [
    body('fullname', 'Атыңыз').isLength({ min: 2, max: 30 }).isString(),
    body('email', 'Поштаңыз').isEmail(),
    body('password', 'Құпия сөзіңіз').isLength({ min: 6, max: 16 }).isString()
]


export const login = [
    body('email').isEmail(),
    body('password').isLength({ min: 5, max: 24 }).isString()
]


