var express = require('express');
var router = express.Router();

const Sequelize = require('sequelize');
const Customer = require('../models').customers;  

router.get('/findAll/json', function(req, res, next) {  

	
    Customer.findAll({  
        attributes: { exclude: ["id","phone","addressLine1","addressLine2","city","state"
    ,"postalCode","country","salesRepEmployeeNumber","creditLimit", "createdAt","updatedAt"] }  
    })  
    .then(customers => {  
        res.json(customers);  
    })  
    .catch(error => res.status(400).send(error)) 
  
  });

router.get('/findAll/view', function(req, res, next) {  

  
    Customer.findAll({  
        attributes: { exclude: ["id","phone","addressLine1","addressLine2","city","state"
    ,"postalCode","country","salesRepEmployeeNumber","creditLimit", "createdAt","updatedAt"] }
    })  
    .then(customers => {  
        res.render('customers', { title: 'Customers', arrCustomers: customers });  
    })  
    .catch(error => res.status(400).send(error)) 
  
  });


module.exports = router;
