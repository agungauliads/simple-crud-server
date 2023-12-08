const express = require('express');
const indexController = require('../controllers/controller');
const productRouter = require('../routes/product');

const router = express.Router();


router.post('/register', indexController.register);
router.post('/login', indexController.login);

router.use('/products', productRouter);

module.exports = router;
