const express = require('express')
const app = express() //เรียกใช้งาน express
const port = 8000

const mysql = require('mysql2/promise')
const bodyParser = require('body-parser') //library ส่งข้อมูลผ่าน body
app.use(bodyParser.json())

const cors = require('cors') //CORS Origin
app.use(cors())

//function เชื่อมต่อ MySQL
let conn = null
const connectMySQL = async () =>{
  conn = await mysql.createConnection({
    host: 'localhost',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name'
  })
}
//เรียกใช้ connectSQL ตอน start server
app.listen (port, async () => {
  await connectMySQL()
  console.log(`Node Running on port: ${port}`)
})

//CREATE
app.post('/users', async (req, res) => {
  
  const data = req.body
  
  try {
    const result = await conn.query('INSERT INTO Your_Database_Table SET ?', data)
    const userId = result[0].insertID
    res.status(201).json({ message: 'Create user successful', userId })
  } catch (error) {
    console.error('Creating user Error:', error.message)
    res.status(500).json({ error: 'Creating user Error!!' })
  }
})

//READ
app.get('/users', async (req, res) => {
  try {
    let result = await conn.query('SELECT * FROM Your_Database_Table')
    res.json(result[0])
  } catch (error) {
    console.error('Error fetching users:', error.message)
    res.status(500).json({ error: 'Error fetching users' })
  }
})

//GET ข้อมูลรายคน /users/:id
app.get('/users/:id', async (req, res) => {
  
  const id = req.params.id
  
  try {
    let result = await conn.query('SELECT * FROM Your_Database_Table WHERE id = ?', id)
    if(result[0].length === 0){
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(result[0])
  } catch (error) {
    console.error('Error fetching users:', error.message)
    res.status(500).json({ error: 'Error fetching users' })
  }
})

//UPDATE ข้อมูลรายคน /users/:id
app.put('/users/:id', async (req, res) => {

  const id = req.params.id
  const data = req.body

  try {
    const result = await conn.query('UPDATE Your_Database_Table SET ? WHERE id = ?', [data, id])
    if (result[0].affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ message: 'Update DONE!', userId: id })
  } catch (error) {
    console.error('Error updating user:', error.message)
    res.status(500).json({ error: 'Error updating user' })
  }

})

//DELETE
app.delete('/users/:id', async (req, res) => {
  
  const id = req.params.id

  try{
    const result = await conn.query('DELETE FROM Your_Database_Table WHERE id = ?', id)
    if(result[0].affectedRows === 0){
      return res.status(404).json({ error: 'User not found' })
    }
    res.json({ message: 'Delete DONE!'})
  } catch (error) {
    console.error('Error updating user:', error.message)
    res.status(500).json({ error: 'Error updating user' })
  }
})