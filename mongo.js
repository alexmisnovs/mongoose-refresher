const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const url = process.env.ATLAS_STRING;
const dbname = "shop";
const createProduct = async (req, res, next) => {
  const newProduct = {
    name: req.body.name,
    price: req.body.price
  };
  const client = new MongoClient(url);
  
  try {
    await client.connect();
    const db = client.db(dbname);
      try {
        const product = await db.collection('products').insertOne(newProduct);
      } catch (err) {
        res.json({message: err.message, code: err.code});
      }
  } catch (error) {
     res.json({message: error.message});
  };
  client.close();
  
  res.json(newProduct);
};

const getProducts = async (req, res, next) => {
  const client = new MongoClient(url);
  let products;
  try{
    await client.connect();
    const db = client.db(dbname);
    products = await db.collection('products').find().toArray();
  
  }catch (error) {
    res.json({message: error.message});
 };
 client.close();
 res.json(products)
};

exports.createProduct = createProduct;
exports.getProducts = getProducts;
