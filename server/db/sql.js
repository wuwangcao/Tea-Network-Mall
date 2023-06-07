const mysql = require('mysql')
let connection = mysql.createPool({
  host:'localhost',
  user:'root',
  password:'admin123',
  database:'vue_shang_cheng'
})
module.exports = connection