const models = require("./schemas")
const vps = models.vps;
const user = models.user;


const login= async (username, pass)=>{
	const data = await user.findOne({user:username,password:pass}).exec()
	if(data){
		return {rol:data.rol,status:200}
	}else{
		return {status:404}
	}
}

const creating=async(username,pass,rol)=>{
	const datos = new user({
		user:username,
		password:pass,
		rol:rol
	})
	datos.save();
}

const nVps = async(ip,puertos,username,password,conex,localidad)=>{
	const new_vps = new vps({
		ip:ip,
		puertos:puertos,
		user:username,
		pass:password,
		conexiones:conex,
		localidad:localidad
	})
	new_vps.save();
}
const getVps = async ()=>{
	const vpss = await vps.find().exec()
	return vpss
}

module.exports = {
	login,
	creating,
	nVps,
	getVps
}