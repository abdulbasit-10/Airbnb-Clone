const express = require('express');
const router =  express.Router();
const  geminiChatResponse  = require('../controllers/geminiController.js');

// launches
router.get('/latest' , (_ , res)=> geminiChatResponse("Show me 10 latest AI tools launched recently" , res));
router.get('/upcomming' , (_ , res)=> geminiChatResponse("Give me 10 AI tools that are launching soon or coming in the near future" , res));
// products
router.get('/products' , (_ ,res)=> geminiChatResponse("Give me the 10 most popular and widely used AI tools right now", res));
router.get('/categories' , (_ , res)=> geminiChatResponse("Give me the top 10 AI tool categories and 1 example AI tool for each category." , res));
router.get('/trending' , (_ , res)=> geminiChatResponse("Give me the top 10 trending AI tools that are currently hot right now." , res));



module.exports = router;

