// import mysql from "mysql2"
const mysql = require('mysql2')

const db = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'employees'
});


db.connect((err) => {
    if (err) throw err
});


module.exports = db







// export default db; 