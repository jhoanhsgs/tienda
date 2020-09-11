const mongoose = require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
	user:String,
	password:String,
	//caducidad:Date,
	rol:Number
})

const vpsSchema = new schema({
	ip:String,
	puertos:String,
	user:String,
	pass:String,
	conexiones:Number,
	localidad:String
})


const user = mongoose.model("user", userSchema);
const vps = mongoose.model("vps",vpsSchema);


module.exports={
	user,
	vps
} 