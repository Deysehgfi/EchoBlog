import conn  from "../config/conn.js";

import { DataTypes } from "sequelize";

const Postagem = conn.define("postagens", 
{
    id:{
        type: DataTypes.UUID, 
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: true,
        required: true
    },
    conteudo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    autor: { 
        type: DataTypes.STRING,
        allowNull: true
    }
    // },
    // image: {
    //     type: DataTypes.STRING,
    //     allowNull: false
    // }
},{
    tableName: "postagens",
})


export default Postagem;