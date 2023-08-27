
const Book = require('../models/Books')
const {mutipleMongooseToObject, mongooseToObject} = require('../../until/mongoose')

class BookController{
    // GET create
    create(req,res,next) {
        res.render('books/create')
    }

    //POST store
    store(req,res,next){
        const formData = req.body
        const book = new Book(formData)
        book.save()
            .then(()=> {
                res.redirect('/')
            })
            .catch(error => {

            })
    }
    edit(req,res,next){
        Book.findById(req.params.id)
            .then(book=> res.render('books/edit', {
                book: mongooseToObject(book)
            }))
            .catch(next)
        // Book.findById(req.params.id)
        // .then(book=> res.json(book))
        // .catch(next)
    }
    list(req, res, next) {
        Book.find({})
            .then(books=> {
                res.render('me/list', {
                    books:mutipleMongooseToObject(books)
                })
            })
            .catch(next)
    }
    //PUT /courses/:id
    update(req,res,next){
        Book.updateOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('list'))
            .catch(next)
    }
    //DELETE /books/:id
    delete(req,res,next){
        Book.deleteOne({_id: req.params.id}, req.body)
            .then(()=> res.redirect('back'))
            .catch(next)
    }

}

module.exports = new BookController
