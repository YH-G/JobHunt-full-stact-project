const mongoose = require('mongoose')
// 链接mongo 并且使用imooc这个集合
const DB_URL = 'mongodb://localhost:27017/imooc-chat'
// const DB_URL = 'mongodb://jobhunt:jobhunt123@ds119765.mlab.com:19765/job-hunt-database'
mongoose.connect(DB_URL)

const models = {
	user: {
		'user': {type:String, 'require':true},
		'pwd': {type:String, 'require':true},
		'type': {'type':String, 'require':true},
		'avatar': {'type':String},
		'desc': {'type':String},
		'title': {'type':String},
		'company':{'type':String},
		'salary':{'type':String}
	},
	chat: {
		'chatid': {'type': String, 'require': true},
		'from': {'type': String, 'require': true},
		'to': {'type': String, 'require': true},
		'read': {'type': Boolean, 'default': false},
		'content': {'type': String, 'require': true, 'default': ''},
		'creat_time': {'type': Number, 'default': new Date().getTime()}
	}
}

for(let m in models){
	mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
	getModel: function(name){
		return mongoose.model(name)
	}
}














// const models = {
// 	user:{
// 		'user':{type:String, 'require':true},
// 		'pwd':{type:String, 'require':true},
// 		'type':{'type':String, 'require':true},
// 		//头像
// 		'avatar':{'type':String},
// 		// 个人简介或者职位简介
// 		'desc':{'type':String},
// 		// 职位名
// 		'title':{'type':String},
// 		// 如果你是boss 还有两个字段
// 		'company':{'type':String},
// 		'money':{'type':String}
// 	},
// 	chat:{
// 	}
// }

// for(let m in models){
// 	mongoose.model(m, new mongoose.Schema(models[m]))
// }

// module.exports = {
// 	getModel:function(name){
// 		return mongoose.model(name)
// 	}
// }


