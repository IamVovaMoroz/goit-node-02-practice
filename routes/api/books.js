const express = require('express')
// для проверки поступающих обьектов на сервер, чтобы соответствовали требованиям
const Joi = require("joi")
// импортируем обьект методов отправки запросов
const books = require('../../models/books/index')

// импорт HttpError

const {HttpError} = require("../../helpers")


const router = express.Router()

// создаем обязательный стандарт  обьекта передаваемого
const addSchema = Joi.object({
  title: Joi.string().required(),
  author:Joi.string().required()
})

// запрос на все книги
// получаю все книги  const result = await books.getAll()
//  возвращаю массив через res.json(result)
//  try{}catch(error){}
router.get('/', async (req, res, next) => {
  try {
    const result = await books.getAll()
    res.json(result)
  } catch (error) {
    next(error)
    // res.status(500).json({
    //   message: 'Server error'
    // })
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
router.get('/:id', async (req, res) => {
    // так можем прочитать, какой ид ввели  console.log(req.params)
  // если нет с таким ИД обьекта - ошибка 404!
    try {
      const { id } = req.params
      const result = await books.getById(id)
      if(!result){
        const error = new Error("")
        error.status = 404
        throw error
        //   return res.status(404).json({
        //       message: "Not found"
        //   })
      }
      res.json(result)
    } catch (error) {
        const {status = 500, message = "Server error"} = error
      res.status(status).json({
        message
      })
    }
  })
// ВАРИАНТ 3 ОШИБКИ с импортом ошибки с отдельного файла
router.get('/:id', async (req, res, next) => {
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
      // вызываем next и передаем ошибку, он ищет обработчик ошибок, он будет искать по всем записям пока не найдёт . Т.к обработчик ошибки состоит из app.use(err, req, res, next)
      // app.use((err, req, res, next) => {
      //   const {status = 500, message = "Server error"} = err
      //   res.status(status).json({ message })
      //   })

      next(error)
      //   const {status = 500, message = "Server error"} = error
      // res.status(status).json({
      //   message
      // })
    }
  })


router.post ('/', async (req, res, next) => {
  try{
    // вызываем метод validate и передаем наш запрос req.body если не соответсвует - ошибку 
    const {error} = addSchema.validate(req.body)
    if (error){
 
      throw HttpError(404, error.message)
    }
    const result = await books.add(req.body)
    // успешная передача книги 201 статус
    res.status(201).json(result)
    // тело запроса на отправку сохраняется в console.log(req.body)

  }catch(error){next(error)}
})

// запрос на обновление книги
router.put('/:id', async (req, res, next) => {
try{
  const {error} = addSchema.validate(req.body)
  if (error){

    throw HttpError(404, error.message)
  }
  const {id} = req.params 
  const result = await books.updateById(id, req.body)
  if(!result){
    throw HttpError(404, "Not found")
  }
  res.json(result)

}catch(error){
  next(error)
}

})
// запрос на удаление книги

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await books.deleteById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    // res.status(204).send();
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router

