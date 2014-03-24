// server.js
var express = require("express");
var logfmt = require("logfmt");
var app = express(); 
var mongoose = require ("mongoose"); 

// Here we find an appropriate database to connect to, defaulting to
// localhost if we don't find one.
var uristring =
process.env.MONGOLAB_URI ||
process.env.MONGOHQ_URL ||
'mongodb://localhost/dario';

/************************* load models *******************************/
var Dar = require("./models/models.js").Dar;
var Answer = require("./models/models.js").Answer;
var Score =  require("./models/models.js").Score;
//now we should be able to do Dar.find etc..


/************************* init and config  *************************/
app.use(logfmt.requestLogger()); //heroku logging thingie
mongoose.connect(uristring, function (err, res) { //connect to goose to the mongodb
	if (err) {
	  	console.log('Dar.io is not feeling so good right now, please try later..');
	  	return 1
	} else {
	  	console.log('Dar.io connected and ready to rumble');	  	
	}
});


app.configure(function() {
		app.use(express.static(__dirname + '/public'));	// set the static files location
		app.use(express.bodyParser()); 					// pull information from html in POST
		app.use(express.methodOverride()); 				// simulate DELETE and PUT
});


/************************* API ***********************/

// get all dars (remove this function!)
app.get('/api/alldars', function(req,res) {
	Dar.find(function(err, dars) {
			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(dars); // return all todos in JSON format
		});
});

// delete a dar
app.delete('/api/dardeletion/:dar_id', function(req, res) {
	Dar.remove({
		_id : req.params.todo_id
	}, function(err, dar) {
		if (err)
			res.send(err);
	
		res.json(dar); /*return the deleted dar in lieu of better ideas*/			
	});
});

// create dar and send it back after creation
app.post('/api/dar', function(req, res) { //notice POST

	// information comes from AJAX request from Angular
	Todo.create({
		name : req.body.text,
		completed : false //TODO: ADD MORE FIELDS!
	}, function(err, dar) {
		if (err)
			res.send(err);		
		res.json(dar);		
	});

});



/************************* TEST INTERFACE ***********************/



app.get('/test/create', function(req,res) {
		// create a todo, information comes from AJAX request from Angular
		var s1 = Score.create({score:[3,2,4]},function(err,s) {
			if (err) {
				res.send(err);
			} else {

				var a1 = Answer.create({
					respondent_email: "emil@lemur.dk",
					param_weights:[1,4,2],
					scores:[s]
				}, function(err,ans) {
					if (err) {
						res.send(err);
					} else {
						Dar.create({
							name : "test dar2...",
							closed : false,
							assesment_parameters : ["usability","look","price"],
							solution_contenders:["prod1","prod2","prod3"],
							responses:[ans]

						}, function(err, dar) {
							if (err)
								res.send(err);

							// get and return all the todos after you create another
							res.send("donny");
						});
					}
						

				});
			}
		});
});


/************************* daradmin *************************/
app.get('/daradmin/:id', function(req, res) { 
	  	//Show admin interface.
	  	var darId = req.params.id;

	  if (darId > 1) {
	  	//console.log ('ERROR connecting to: ' + uristring + '. ' + err);
	  	res.send('Dar.io says NO!');
	  } else {
	  	res.send("to be done..");
	  }  
});


// load the single view file
// (angular will handle the page changes on the front-end)
app.get('*', function(req, res) {
	res.sendfile('./public/index.html'); 
});

/************************* start server *************************/
var port = Number(process.env.PORT || 5000);
app.listen(port, function() {
  console.log("Dar.io running on " + port);
});