import jwt from 'jsonwebtoken'
import { usuarioModel } from '../database/associations.js'

export const getUserByToken = async (token) => {

    if (!token) {
        const err = new Error('token de autenticação não fornecido!')
        err.stausCode = 401
        throw err
    }
    try {
        const decoded = jwt.verify(token, "SENHASUPERSECRETA")
        if (!decoded.id) {
            const err = new Error('Formato de token invalido!')
            err.stausCode = 401
            throw err
        }

        const usuario = await usuarioModel.findByPk(decoded.id, {
            attributes: { exclude: ["senha"] },
        })
        return usuario
    } catch (error) {
        throw error
    }
}