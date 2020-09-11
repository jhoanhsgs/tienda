const express = require('express');
const app = express();
const hbs = require('hbs')
const mongoose = require('mongoose')
const path = require('path')
const bodyParser = require("body-parser")
const queries = require("./bbdd/queries.js");

hbs.registerPartials(__dirname + "/partials")
app.set("view engine",'hbs')

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

const publicDir = path.join(__dirname, '/public');
app.use(express.static(publicDir));


mongoose.connect("mongodb://localhost/vpsdb",{ useUnifiedTopology: true, useNewUrlParser: true },(err,conneted)=>{
	if(err){
		console.log(err)
		return 500
	}
	console.log("conected to database")
})


app.get("/",(req,res)=>{
	res.render("index")
})
app.get("/netflix",(req,res)=>{
	res.render("netflix")
})
app.get("/prime",(req,res)=>{
	res.render("prime")
})
app.get("/vps",(req,res)=>{
	res.render("login")
})

app.post("/home",async (req,res)=>{
	user = req.body.user;
	pass = req.body.pass;
	const response = await queries.login(user,pass);
	if(response.status==404){
		res.redirect("/")		
	}
	if(response.status==200){
		switch(response.rol){
			case 0:
				res.render("homeadm")
				break;
			default:
				const vpss = await queries.getVps();
				console.log(vpss)
				res.render("vps",{vpss})
		}
	}
})

app.post("/create-user",async (req,res)=>{
	queries.creating(req.body.user,req.body.pass,req.body.rol);
	res.render("homeadm")
})
//ip, puertos,usuario, contraseña, conexiones, localidad
app.post('/create-vps', async (req,res)=>{
	queries.nVps(req.body.ip, req.body.puertos, req.body.user, req.body.pass, req.body.conexiones, req.body.localidad)
	res.render("homeadm")
})





app.listen(3000,()=>{
	console.log("listening on port 3000")
})