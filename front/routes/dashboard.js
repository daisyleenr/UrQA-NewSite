var express = require('express');
var router = express.Router();
var getViewContainer = function(defaultPath, data, user) {
    return {
        mainContainer: defaultPath + "/index",
        scriptContainer: defaultPath + "/scripts",
        data: data,
        user_id: user.id,
        user_name: user.nickname
    };
};

router.get('/:id', function(req, res) {
    if(req.user){
        var id = req.params.id;
        var data = {id:id, section:0};
        res.render('layout/dashboard/layout', getViewContainer("../../dashboard/dashboard", data, req.user));
    }else{
        res.redirect('/users/login')
    }
});

router.get('/:id/error', function(req, res) {
    if(req.user){
        var id = req.params.id;
        var data = {id:id, section:1};
        res.render('layout/dashboard/layout', getViewContainer("../../dashboard/error", data, req.user));
    }else{
        res.redirect('/users/login')
    }
});

router.get('/:id/error/:idx?', function(req, res) {
    if(req.user){
        var id = req.params.id;
        var data = {id:id, section:1};
        res.render('layout/dashboard/layout', getViewContainer("../../dashboard/detail", data, req.user));
    }else{
        res.redirect('/users/login')
    }
});

router.get('/:id/statistics', function(req, res) {
    if(req.user){
        var id = req.params.id;
        var data = {id:id, section:2};
        res.render('layout/dashboard/layout', getViewContainer("../../dashboard/statistics", data, req.user));
    }else{
        res.redirect('/users/login')
    }
});

router.get('/:id/setting', function(req, res) {
    if(req.user){
        var id = req.params.id;
        var data = {id:id, section:3};
        res.render('layout/dashboard/layout', getViewContainer("../../dashboard/setting/general", data, req.user));
    }else{
        res.redirect('/users/login')
    }
});

router.get('/:id/setting/viewer', function(req, res) {
    if(req.user){
        var id = req.params.id;
        var data = {id:id, section:4};
        res.render('layout/dashboard/layout', getViewContainer("../../dashboard/setting/viewer", data, req.user));
    }else{
        res.redirect('/users/login')
    }
});

router.get('/:id/setting/symbolicate', function(req, res) {
    if(req.user){
        var id = req.params.id;
        var data = {id:id, section:5};
        res.render('layout/dashboard/layout', getViewContainer("../../dashboard/setting/symbolicate", data, req.user));
    }else{
        res.redirect('/users/login')
    }
});

module.exports = router;
