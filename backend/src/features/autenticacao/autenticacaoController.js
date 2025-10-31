import { where } from 'sequelize'
import { usuarioModel } from '../usuario/usuarioModel.js'
import bcrypt from 'bcrypt'
import { createTokenUser } from '../../shared/function/createTokenUser.js'
export const login = async (req, res, next) => {
    const { email, senha } = req.body


    try {
        if (!email) {
            const err = new Error('Campo de email é obrigatorio')
            err.stausCode = 400
            throw err
        }
        if (!senha) {
            const err = new Error('Campo de senha é obrigatorio')
            err.stausCode = 400
            throw err
        }

        const usuarioEncontrado = await usuarioModel.findOne({
            where: { email }
        })

        if (!usuarioEncontrado) {
            const err = new Error('Credenciais invalidas!')
            err.stausCode = 404
            throw err
        }

        const comparaSenha = bcrypt.compareSync(senha, usuarioEncontrado.senha)
        if (!comparaSenha) {
            const err = new Error('Credenciais invalidas!')
            err.stausCode = 404
            throw err
        }
        await createTokenUser(usuarioEncontrado, req, res)

    } catch (error) {
        next(error)
    }
}