const express = require('express')
const allRoutes=express.Router()
const authentication = require("../middlewares/auth.js")
const registerValidator = require("../middlewares/registerValidator.js");


const allfun=require('../controler/funController')


allRoutes.get("/",authentication.loginAuth, allfun.getHome);
allRoutes.get("/register", allfun.getRegisterPage);
allRoutes.post("/registerUser",registerValidator, allfun.registerUser);
allRoutes.post("/login", allfun.loginUser);




allRoutes.get('/tweet', allfun.getHomePage)
 allRoutes.get('/posts/create', allfun.showCreateForm);
allRoutes.post('/posts/create', allfun.createPost);
allRoutes.get("/article/:id", allfun.showPost);
allRoutes.get("/edit/article/:id", allfun.getEditArticlePage)
allRoutes.post("/update/article/:id", allfun.updateArticle)
 
 allRoutes.get("/delete/article/:id", allfun.deleteArticle)

module.exports = allRoutes;