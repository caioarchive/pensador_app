import bcrypt from 'bcrypt'
import { usuarioModel } from './usuarioModel.js';
import { createTokenUser } from '../../shared/function/createTokenUser.js';

export const criarUsuario = async (req, res, next) => {

    const { nome, email, senha, verificaSenha } = req.body

    try {
        if (!nome) {
            const err = new Error('Campo nome é obrigatorio')
            err.statusCode = 400;
            throw err
        }
        if (!email) {
            const err = new Error('Campo email é obrigatorio')
            err.statusCode = 400;
            throw err
        }
        if (!senha) {
            const err = new Error('Campo senha é obrigatorio')
            err.statusCode = 400;
            throw err
        }

        if (!verificaSenha) {
            const err = new Error('Campo de verificação de senha é obrigatorio')
            err.statusCode = 400;
            throw err
        }
        if (senha != verificaSenha) {
            const err = new Error('Campo senha e verifica senha devem ser iguais')
            err.statusCode = 400;
            throw err
        }

        const salt = bcrypt.genSaltSync(12)
        const passwordHash = bcrypt.hashSync(senha, salt)

        const novoUsuario = await usuarioModel.create({ nome, email, senha: passwordHash })

        await createTokenUser(novoUsuario, req, res)
    } catch (error) {
        next(error)
    }

}