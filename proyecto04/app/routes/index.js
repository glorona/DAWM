var express = require('express');
var router = express.Router();
const axios = require('axios');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/customers', async function(req,res,next){

  const URL = 'http://localhost:4444/customers/findAll/json'
  const response = await axios.get(URL)

  res.render('customers',{title:'Customers', customers:response.data})
})

router.get('/customers/getDetail/:id', async function(req,res,next){
  let id = req.params.id;

  const URL = 'http://localhost:4200/sales/getShippedSales/' + id
  const response = await axios.get(URL);

  const URL2 = 'http://localhost:4200/sales/total'

  const response2 = await axios.post(URL2,response.data)

  res.render('customer_detail',{title:'Customer ' + id + 'Detail', products:response.data, total: response2.data.total})


})

router.get('/products', async function(req,res,next){
  const URL = 'http://localhost:4200/sales/getAll'
  const response = await axios.get(URL);


  res.render('products_detail',{title:'Products', sales:response.data})


})

module.exports = router;
