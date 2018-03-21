var express = require('express');
var router = express.Router();
var empModel = require('../models/emplpoyee');

//create routes
//Get employees endpoint
router.get('/', function (req, res) {
    empModel.getAllEmployees(function (err, data) {
        if(err) throw err;
        res.json(data);
    });
});

//Get single employee endpoint
router.get('/:_id', function (req, res) {
   empModel.getSingleEmployee(req.params._id, function (err, data) {
       if(err) throw err;
       res.json(data);
   });
});

// Add employee endpoint
router.post('/', function (req, res) {
   var newEmp = {
       name: req.body.name,
       position: req.body.position,
       department: req.body.department,
       hireType: req.body.hireType,
       salary: req.body.salary
   };
   empModel.insertEmployee(newEmp, function (err, data) {
       if(err) throw err;
       res.json(data);
   });
});

//Update employee endpoint
router.put('/:_id', function (req, res) {
    var updEmp = {
        name: req.body.name,
        position: req.body.position,
        department: req.body.department,
        hireType: req.body.hireType,
        salary: req.body.salary
    };
    empModel.updateEmployee(req.params._id, updEmp, function (err, data) {
        if(err) throw err;
        res.json(data);
    });
});

//Delete employee endpoint
router.delete('/:_id', function (req, res) {
    empModel.deleteEmployee(req.params._id, function (err, data) {
        if(err) throw err;
        res.json(data);
    });
});

module.exports = router;