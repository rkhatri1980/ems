var mongoose = require('mongoose');

var empSchema = new mongoose.Schema({
    name: String,
    position: String,
    department: String,
    hireType: String,
    salary: String
});

var employee = mongoose.model('employee', empSchema, 'employee');
module.exports = employee;

//functions
//get all employee function
module.exports.getAllEmployees = function (callback) {
    employee.find(callback);
};

//get single employee function
module.exports.getSingleEmployee = function (id, callback) {
    employee.findById(id, callback);
};

//insert employee function
module.exports.insertEmployee = function (newEmp, callback) {
    employee.create(newEmp, callback);
};

//update employee function
module.exports.updateEmployee = function (id, updEmp, callback) {
    employee.findByIdAndUpdate(id, updEmp, callback);
};

//delete employee function
module.exports.deleteEmployee = function (id, callback) {
    employee.findByIdAndRemove(id, callback);
};
