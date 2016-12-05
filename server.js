const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (err,req,res,next) {
	console.error(err.stack)
	next(err)
})

MongoClient.connect('mongodb://localhost:27017/contacts',(err, database) => {
	if(err) return console.log(err)
	db = database
	app.listen(3000, function() {
		console.log('listening on 3000'); 
	})

})

app.get('/',(req,res) => {
	res.render('index')

	//var cursor = db.collection('contacts').find().toArray(function(err,results) {
	//	console.log(results)})
})

app.post('/quotes', (req,res) => {
	console.log(req.body)
	db.collection('contacts').save(req.body,(err,result) => {
		if (err) return console.log(err)
		//console.log('saved to database')
		res.redirect('http://507dbjiio2pdtg7ksa1rqdw90j.hop.clickbank.net/')
	})
})



