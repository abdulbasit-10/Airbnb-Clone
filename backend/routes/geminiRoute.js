const express = require('express');
const router =  express.Router();
const  geminiChatResponse  = require('../controllers/geminiController.js');

// launches
router.get('/latest' , ()=> geminiChatResponse("Show me 10 latest AI tools launched recently"));
router.get('/upcomming' , ()=> geminiChatResponse("Give me 10 AI tools that are launching soon or coming in the near future"));
// products
router.get('/products' , ()=> geminiChatResponse("Give me the 10 most popular and widely used AI tools right now"));
router.get('/categories' , ()=> geminiChatResponse("Give me the top 10 AI tool categories and 1 example AI tool for each category."));
router.get('/trending' , ()=> geminiChatResponse("Give me the top 10 trending AI tools that are currently hot right now."));



module.exports = router;
