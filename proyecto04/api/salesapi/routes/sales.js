var express = require('express');
const axios = require('axios');
var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/getAll', async function(req, res, next) {
  
  const URL = 'https://nr-dawm-default-rtdb.firebaseio.com/sales.json'
  const response = await axios.get(URL)
  
  var sales = res.json(response.data); 
  //res.render('fotos', { title: 'Fotos', fotos: response.data });
})

router.get('/getSales/:id', async function(req,res,next){
    let id = req.params.id
    const URL = 'https://nr-dawm-default-rtdb.firebaseio.com/sales.json?' + 'orderBy="customerNumber"&equalTo=' + id ;
    const response = await axios.get(URL)

    res.json(response.data);

})

router.get('/getShippedSales/:id', async function(req,res,next){
    let id = req.params.id
    const URL = 'https://nr-dawm-default-rtdb.firebaseio.com/sales.json?' + 'orderBy="customerNumber"&equalTo=' + id ;
    const response = await axios.get(URL)
    var sales = response.data;
    var valores = Object.values(sales);
    const filtered = valores.filter(item => item.status == "Shipped");
    res.json(filtered)
})

router.post('/total', async function(req,res,next){
    //arreglo con valores
    let arregloSales = req.body;
    let total = 0;
    for(var i = 0; i < arregloSales.length; i++){
        var arregloAc = arregloSales[i]
        let cantidad = arregloAc.quantityOrdered;
        let precio = arregloAc.priceEach;
        total+=(cantidad*precio)
    }

    res.json({total:total})
    



})




module.exports = router;
