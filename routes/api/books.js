const express = require('express')

// импортируем обьект методов отправки запросов
const books = require('../../models/books/index')

// импорт HttpError

const {HttpError} = require("../../helpers")


const router = express.Router()

// запрос на все книги
// получаю все книги  const result = await books.getAll()
//  возвращаю массив через res.json(result)
//  try{}catch(error){}
router.get('/', async (req, res) => {
  try {
    const result = await books.getAll()
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
})
// ВАРИАНТ 1 ОШИБКИ 
// router.get('/:id', async (req, res) => {
//   // так можем прочитать, какой ид ввели  console.log(req.params)
// // если нет с таким ИД обьекта - ошибка 404!
//   try {
//     const { id } = req.params
//     const result = await books.getById(id)
//     if(!result){
//         return res.status(404).json({
//             message: "Not found"
//         })
//     }
//     res.json(result)
//   } catch (error) {
//     res.status(500).json({
//       message: 'Server error'
//     })
//   }
// })

// ВАРИАНТ 2 ОШИБКИ часто встречающийся
// router.get('/:id', async (req, res) => {
//     // так можем прочитать, какой ид ввели  console.log(req.params)
//   // если нет с таким ИД обьекта - ошибка 404!
//     try {
//       const { id } = req.params
//       const result = await books.getById(id)
//       if(!result){
//         const error = new Error("")
//         error.status = 404
//         throw error
//         //   return res.status(404).json({
//         //       message: "Not found"
//         //   })
//       }
//       res.json(result)
//     } catch (error) {
//         const {status = 500, message = "Server error"} = error
//       res.status(status).json({
//         message
//       })
//     }
//   })
// ВАРИАНТ 3 ОШИБКИ с импортом ошибки с отдельного файла
router.get('/:id', async (req, res) => {
    // так можем прочитать, какой ид ввели  console.log(req.params)
  // если нет с таким ИД обьекта - ошибка 404!
    try {
      const { id } = req.params
      const result = await books.getById(id)
      if(!result){
      
        throw HttpError(404, "Not found")
      
      }
    //   если result есть - отправляем
      res.json(result)
    } catch (error) {
        const {status = 500, message = "Server error"} = error
      res.status(status).json({
        message
      })
    }
  })

module.exports = router
