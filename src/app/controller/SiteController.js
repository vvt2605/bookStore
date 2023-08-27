
const Book = require('../models/Books')
const {mutipleMongooseToObject} = require('../../until/mongoose')

class SiteController{

    //GET home
    home(req,res,next){
        Book.find({})
            .then(books => {
                res.render('home', {
                    books: mutipleMongooseToObject(books)
                })
            })
            .catch(next)
        // Book.find({})
        //     .then(books => res.json(books))
        //     .catch(next)
       
    }
}

module.exports = new SiteController
