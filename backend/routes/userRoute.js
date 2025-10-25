const express = require('express');
// const app = express();
const router = express.Router();

const { signup, signin }= require("../controllers/authController.js");


router.post('/login',signin)
router.post('/signup',  signup);


module.exports = router;