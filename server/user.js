const express = require('express')
const Router = express.Router()
const model = require('./model')
const utils = require('utility')
const User = model.getModel('user')
const Chat = model.getModel('chat')
//查询结果不显示项
const _filter = {pwd: 0, __v: 0}

Router.get('/list', function(req, res){
	const { type } = req.query
	User.find({type}, function(err, doc){
		return res.json({code: 0, data: doc})
	})
})

Router.get('/getmsglist', function(req, res) {
	const user = req.cookies.userid
	User.find({}, function(e, userdoc) {
		let users = {}
		userdoc.forEach((v) => {
			users[v._id] = {name: v.user, avatar: v.avatar}
		})
		Chat.find({'$or': [{from: user}, {to: user}]}, function(err, doc) {
			if (!err) {
				return res.json({code: 0, msgs: doc, users: users})
			}
		})
	})
})

Router.post('/readmsg', function(req, res) {
	const userid = req.cookies.userid
	const {from} = req.body
	console.log(userid, from)
	Chat.update({from, to: userid}, {'$set': {read: true}}, {'multi': true},  function(err, doc) {
		console.log(doc)
		if (!err) {
			return res.json({code: 0, num: doc.nModified})
		}
		return res.json({code: 1, msg: 'failed'})
	})
})

Router.post('/update', function(req, res) {
	const userid = req.cookies.userid
	if (!userid) {
		return json.dumps({code: 1})
	}
	const body = req.body
	console.log(body)
	User.findByIdAndUpdate(userid, body, function(err, doc) {
		const data = Object.assign({}, {
			user: doc.user,
			type: doc.type
		}, body)
		return res.json({code: 0, data})
	})
})

Router.post('/login', function(req, res) {
	const {user, pwd} = req.body
	User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
		if (!doc) {
			return res.json({code: 1, msg: 'Username or password is not correct'})
		}
		res.cookie('userid', doc._id)
		return res.json({code: 0, data: doc})
	})
})

Router.post('/register', function(req, res){
	console.log(req.body)
	const {user, pwd, type} = req.body
	User.findOne({user: user}, function(err, doc) {
		if (doc) {
			return res.json({code: 1, msg: 'The username has alreary existed'})
		}
		const userModel = new User({user, type, pwd: md5Pwd(pwd)})
		userModel.save(function(err, doc) {
			if (err) {
				return res.json({code: 1, msg: 'An error occers'})
			}
			const {user, type, _id} = doc
			res.cookie('userid', _id)
			return res.json({code: 0, data: {user, type, _id}})
		})

		//此写法无法返回id，因为id是注册后生成的
		// User.create({user, type, pwd: md5Pwd(pwd)}, function(err, doc) {
		// 	if (err) {
		// 		return res.json({code: 1, msg: 'An error occers'})
		// 	}
		// 	return res.json({code: 0})
		// })
	})
})

Router.get('/info', function(req,  res) {
	// 用户是否有cookie
	const {userid} = req.cookies
	if (!userid) {
		return res.json({code: 1})
	}
	User.findOne({_id: userid}, _filter, function(err, doc) {
		if (err) {
			return res.json({code: 1, msg: 'An error occers'})
		}
		if (doc) {
			return res.json({code: 0, data: doc})
		}
	})
})


//密码加密
function md5Pwd(pwd) {
	const salt = 'generate_a_new_pwd_123!@#'
	return utils.md5(utils.md5(pwd+salt))
}

module.exports = Router