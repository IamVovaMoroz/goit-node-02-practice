// app.js
const express = require('express')
const logger = require('morgan')
const cors = require('cors')

const contactsRouter = require('./routes/api/contacts')
// импортируем router
const booksRouter = require("./routes/api/books")

const app = express()

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger))
app.use(cors())
// проверяет какой запрос и какой тип запроса на сервер.если это application/json пришёл, переделывает на обьект. ЭТо обязательн для json отправки запросов 
app.use(express.json())

// прописали путь вызовов для  booksRouter
app.use("/api/books", booksRouter)

app.use('/api/contacts', contactsRouter)

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, req, res, next) => {
const {status = 500, message = "Server error"} = err
res.status(status).json({ message })
})

module.exports = app
