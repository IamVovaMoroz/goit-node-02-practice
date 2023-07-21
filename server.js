const app = require('./app')

app.listen(3000, () => {
  console.log("Server running. Use our API on port: 3000")
})

// // импортируем mongoose
// const mongoose = require("mongoose")

// const app = require('./app')

// // подключаем по ссылке с mongoDB
// const DB_HOST = "mongodb+srv://VolodymyrMoroz:NOni01041983@cluster0.oyfrio4.mongodb.net/books_base"
// // при обновлении чтобы не скинуло
// mongoose.set('strictQuery', true)

// // запуск сервера после успешно подсоединения к dataBase
// mongoose.connect(DB_HOST).then(()=>{
//   app.listen(3000)
// })
// .catch(error => {
//   console.log(error.message)
//   // останавливает запущенный процесс в случае ошибки
//   process.exit(1)
// } )

// // app.listen(3000, () => {
// //   console.log("Server running. Use our API on port: 3000")
// // })



