import { where } from 'sequelize'
import { usuarioModel } from '../usuario/usuarioModel.js'

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
        res.status(200).json({ usuarioEncontrado })
    } catch (error) {
        next(error)
    }
}