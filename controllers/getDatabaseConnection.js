require('dotenv').config()
const mysql = require('mysql2/promise')

const getDatabaseConnection = async () => {
  try {
    const connectionConfig = {
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
    }
    const connection = await mysql.createConnection(connectionConfig)
    return connection
  } catch (error) {
    console.error('Não foi possível se conectar ao banco de dados: ', error)
  }
}

module.exports = getDatabaseConnection
