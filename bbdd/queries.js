const models = require("./schemas")
const vps = models.vps;
const user = models.user;


const login= async (username, pass)=>{
	const data = await user.findOne({user:username,password:pass}).exec()
	if(data){
		return {caducidad:data.caducidad,rol:data.rol,status:200}
	}else{
		return {status:404}
	}
}

const creating=async(username,pass,caducidad,rol)=>{
	exist = await login(username,pass);
	if(exist.status == 404){
		const datos = new user({
			user:username,
			password:pass,
			caducidad:caducidad,
			rol:rol
		})
		datos.save();
		return "Usuario creado satisfactoriamente"
	}else{
		return "El usuario ya existe"
	}
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