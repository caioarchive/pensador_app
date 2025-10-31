import { getToken } from "../../shared/function/getToken.js";
import { pensamentoModel } from "./pensamentoModel.js";
import { getUserByToken } from "../../shared/function/getUserByToken.js";
export const listarPensamento = async (req, res, next) => {
    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 20
    const order = request.query.order || 'DESC'
    const offset = (page - 1) * pageSize

    try {
        const { count, rows: pensamentos } = await pensamentoModel.findAndCountAll({
            attributes: ['id', 'pensamento'],
            order: [['created_at', order]],
            limit: pageSize,
            offset: offset,
            include: {
                association: 'usuario',
                attributes: ['nome']
            }
        })

        //formatar o response
        const totalPages = Math.ceil(count / page)
        const hasNextPage = page < totalPages
        const hasPreviusPage = page > 1;



        res.status(200).json({
            success: true,
            pagination: {
                currentPage: page,
                pageSize: pageSize,
                totalItens: count,
                totalPages: 120,
                hasNextPage: hasNextPage,
                hasPreviusPage: hasPreviusPage
            },
            data: pensamentos
        })
    } catch (error) {

    }
}

export const criarPensamento = async (req, res, next) => {
    const { pensamento } = req.body;

    try {
        if (!pensamento) {
            const err = new Error("campo pensamento é obrigatorio")
            err.statusCode = 400;
            throw err;
        }
        const token = await getToken(req)
        const usuario = await getUserByToken(token)
        console.log(usuario)


        const objPensamento = {
            pensamento: pensamento,
            usuarioId: usuario.id
        }

        const novoPensamentos = await pensamentoModel


    } catch (error) {
        next(error)
    }
}
