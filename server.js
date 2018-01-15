var express = require('express');
var app = express();

var mongojs = require('mongojs');
var bodyParser = require('body-parser');
var db = mongojs('doctors',['doctors'])

app.use(express.static(__dirname+"/public"));
app.use(bodyParser.json());

app.get('/doctorslist',function(req,res){
	console.log("I received a GET request")
	db.doctors.find(function(err,docs){
		console.log(docs);
		res.json(docs);
	});	
})

app.post('/doctorslist', function(req,res){
	console.log(req.body);
	db.doctors.insert(req.body, function(err,doctor){
		res.json(doctor);
	})
});

app.delete('/doctorslist/:id',function(req,res){
	var id = req.params.id
	db.doctors.remove({_id: mongojs.ObjectId(id)}, function(err,doctor){
		res.json(doctor);
	});
});

app.get('/doctorslist/:id',function(req,res){
	var id = req.params.id
	console.log(id);
	db.doctors.findOne({_id: mongojs.ObjectId(id)}, function(err,doctor){
		res.json(doctor);
	});
});

app.put('/doctorslist/:id',function(req,res){
	var id = req.params.id
	console.log("I received a PUT request for "+req.body)
	db.doctors.findAndModify({query: {_id: mongojs.ObjectId(id)}, 
		update: {$set: {
		name: req.body.name,
		specialization: req.body.specialization,
		contact_no: req.body.contact_no,
		email: req.body.email}}, 
		new: true}, function(err,doctor){
			res.json(doctor)
		})
})

app.listen(3000);
console.log("Server is listening on port 3000");