
const Book = require('../models/Books')
const { mutipleMongooseToObject } = require('../../until/mongoose')
const User = require('../models/User')
const http = require('http');


class SiteController {

    //GET home
    home(req, res, next) {
        Book.find({})
            .then(books => {
                res.set('account', ' ')
                res.render('home', {
                    books: mutipleMongooseToObject(books)
                })
            })
            .catch(next)
    }
    //GET register 
    register(req, res, next) {
        res.render('register')
    }
    //POST register
    async registerPost(req, res, next) {
        try {
            const { username, password,passwordConfirm} = req.body;
            const existingUser = await User.findOne({ username }); // Check if the user already exists

            if (existingUser) {
                return res.render('register', {
                    message: 'Tài khoản đã tồn tại!'
                });
            }
            if (password !== passwordConfirm ){
                return res.render('register', {
                    message: 'Mật khẩu nhập lại không đúng. Vui lòng nhập lại'
                }); 
            }

            const newUser = new User({ username, password });
            await newUser.save();

            res.render('register', {
                message: 'Tạo tài khoản thành công! Hãy đăng nhập để sủ dụng tài khoản'
            });
           

        } catch (error) {
            next(error);
        }
    }
    //GET login
    login(req, res, next) {
        res.render('login')
    }
    //POST login
    async loginPost(req, res, next) {
        try {
            const user = await User.findOne({ username: req.body.username });
            if (user) {
                const result = req.body.password === user.password;
                if (result) {
                    Book.find({})
                        .then(books => {
                            res.set('account', user.username);
                            // res.render('home', {
                            //     books: mutipleMongooseToObject(books)
                            // })
                            res.redirect('/')
                            
                        })
                        .catch(next)
                } else {
                    res.render('login', {
                        message: 'Sai mật khẩu. Vui lòng thử lại'
                    });
                    // res.status(400).json({ error: "password doesn't match" });
                }
            } else {
                res.render('login', {
                    message: 'Tài khoản không tồn tại. Vui lòng thử lại'
                });
                // res.status(400).json({ error: "User doesn't exist" });
            }
        } catch (error) {
            res.status(400).json({ error });
        }
    }
    //GET logout
    logout(req, res, next) {
        res.render('logout')
    }


}

module.exports = new SiteController
