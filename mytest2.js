var express = require("express");
var bodyParser = require("body-parser");
var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'debutbd'
});

var app = express();
   app.use(bodyParser.urlencoded({extended: true}));
   app.use(bodyParser.json());

connection.connect(function(err){
if(!err) {
    console.log("Database is connected ...");    
} else {
    console.log("Error connecting database ...");    
}
});
app.get("/users/data", function(req,res){
	 var data = {
		 nom: req.params.nom,
		 prenom: req.params.prenom,
		 username: req.params.username,
		 password: req.params.password,
		 dateNaissance: req.params.dateNaissance
	
	 };
	    
	connection.query('SELECT data from utilisateurs1 WHERE date=?', function(err, result, fields){
		if (err) throw err;
		if(result.length > 0)
			res.send('username fetched...');
	})		
});


app.post('/users', function(req, res){
    var data = {
		 nom: req.body.nom,
		 prenom: req.body.prenom,
		 username: req.body.username,
		 password: req.body.password,
		 dateNaissance: req.body.dateNaissance
	};
	
	var records = [
		[data.nom, data.prenom, data.username, 
		data.password, data.dateNaissance]
	]
	 
	//console.log(data.nom); 
	 
	connection.query("INSERT INTO Utilisateurs1 (nom, prenom, username, password, date_naissance) VALUES ? ", [records]) ,function(err, rows, fields){
		
		res.json({"message": "data is correct"});
		/*if(rows.length != 0){
			data["Data"] = "data is correct.";
			res.json({"message": "data is correct"});
		}else{
			data["Data"] = "data is incorrect.";
			res.json({"message": "data is incorrect"});
		}*/
	}
});
app.delete("/users/id" function(err){ 
	if (err) throw err;
	var sql = "DELETE FROM utilisateurs1 WHERE id=?"
	connection.query(sql, [1], function (err, result){
        res.json({message : "records deleted"}); 
        consol.loq(result);
	}); 
});

 
app.post('/login', function(req, res){
	 var data = {
		 username: req.body.username,
		 password: req.body.password,
	 };
	 connection.query("SELECT * from login WHERE username =? and password=?, Utilisateurs1",[username,pass],function(err, rows, fields){
        if(rows.length != 0){
            data["Data"] = "Successfully logged in..";
            res.json(data);
        }else{
            data["Data"] = "username or password is incorrect.";
            res.json(data);
        }
    });
});
app.listen(3000);