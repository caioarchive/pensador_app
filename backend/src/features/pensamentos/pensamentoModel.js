import { DataTypes } from "sequelize";
import { conn } from "../../config/sequelize.js";
import { usuarioModel } from "../usuario/usuarioModel.js";
export const pensamentoModel = conn.define(
    "pensamentos",
    {
        pensamento:{
            type: DataTypes.STRING,
            allowNull: false
        },
        usuarioId: {
            type: DataTypes.UUID,
            references: {
                model: usuarioModel,
                key: "id"
            }
        }
    },
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    },
)