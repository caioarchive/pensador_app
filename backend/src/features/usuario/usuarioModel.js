import { DataTypes, UUIDV4 } from "sequelize";
import { conn } from "../../config/sequelize.js";

export const usuarioModel = conn.define(
    "usuarios",
    {   
        id:{
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true    
            
        },
        nome:{
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate:{
                isEmail: true
            },
        },
        senha:{
            type: DataTypes.STRING,
            allowNull: false
        }

    },  
    {
        createdAt: 'created_at',
        updatedAt: 'updated_at',
    }
)