// index.js
const fs = require('fs/promises')

const path = require('path')
const { nanoid } = require('nanoid')

// const booksPath = path.join(__dirname, 'books.json')

// меняем при перенесинии в папку
const booksPath = path.join(__dirname, '..', 'books', 'books.json')

console.log(booksPath)

const getAll = async () => {

  const data = await fs.readFile(booksPath)
  return JSON.parse(data)
}

const getById = async id => {
  // получаем вначале весь обьект
  const books = await getAll()
  const result = books.find(item => item.id === id)
  return result || null
}

const add = async data => {
  // получили все книги
  const books = await getAll()

  // Проверяем, есть ли уже книга с указанным title и author, чтобы не добавлять повторно
  const existingBook = books.find(
    book => book.title === data.title && book.author === data.author
  )
  if (existingBook) {
    console.log('Книга уже существует')
    return null
  }

  // создаем новую. Добавляем id и данные которые приходят т.е. title , author - получаем обьект готовый
  const newBook = {
    //
    id: nanoid(),
    ...data
  }
  // в книги закидываем newBook
  books.push(newBook)
  // перезаписываем все
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
  // возвращаем новую книгу
  return newBook
}

const updateById = async (id, data) => {
  const books = await getAll()
  const index = books.findIndex(item => item.id === id)
  if (index === -1) {
    return null
  }
  // перезаписываем книгу по индексу books[index]
  books[index] = { id, ...data }
  // перезаписываем JSON
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
  return books[index]
}

const deleteById = async id => {
  // получаем вначале весь обьект
  const books = await getAll()
  const index = books.findIndex(item => item.id === Number(id))
  if (index === -1) {
    return null
  }
  // Метод splice() изменяет исходный массив, удаляя элементы, и возвращает массив удаленных элементов.
  const [result] = books.splice(index, 1)
  await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
  return result
}

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById
}
