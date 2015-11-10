var express = require('express');
var router = express.Router();

module.exports = function(passport){

    router.get('/login', function(req, res, next) {
        if(!req.user){
            res.render('user/login');
        }else{
            res.redirect('/projects');
        }
    });

    router.post('/login', passport.authenticate('login', { successRedirect: '/projects',
        failureRedirect: '/users/login',
        failureFlash: true })
    );

    router.get('/logout', function(req, res, next){
        req.logout();
        res.redirect('/');
    });

    router.get('/join', function(req, res, next) {
        res.render('user/join');
    });

    router.post('/join', passport.authenticate('join', { successRedirect: '/projects',
        failureRedirect: '/users/join',
        failureFlash: true })
    );

    return router;
}

