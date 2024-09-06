import { Sequelize } from "sequelize"

const conn = new Sequelize("EchoBlog", "root", "Sen@iDev77!.", {
    host: 3306,
    dialect: "mysql"
})
export default conn;
