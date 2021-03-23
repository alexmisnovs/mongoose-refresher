require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/product');

mongoose.connect(process.env.ATLAS_STRING).then(()=> {
   console.log('Connected to db server');
}).catch(error => {
   console.log(error.message)
});

const createProduct = async (req, res, next) => {
   const createdProduct = new Product({
      name: req.body.name,
      price: req.body.price
   });
   let result
   try {
       result = await createdProduct.save();
       console.log(typeof createdProduct.id);
     } catch (err) {
        return res.json({message: err.message, code: err.code});
    }

   res.json(result);
}
const getProducts = async (req, res, next) => {
   let products = await Product.find().exec();
   res.json(products)
}

exports.createProduct = createProduct;
exports.getProducts = getProducts;