const ObjectID = require('mongodb').ObjectID
const { User } = require('./model')
const moment = require('moment-timezone')
moment.tz.setDefault('Asia/Jakarta').locale('id')

// collection of function that handles interactions with the database


    // create new user and store it in the database
    async function createUser(name, email, pass) {
        let obj = {name: name, email: email, password: pass, todo: []}
        await User.create(obj)
    }
    module.exports.createUser = createUser

    // check if user with given email exists in the database
    async function checkEmail(email) {
        let users = await User.findOne({email: email})
        if(users !== null) {
            console.log(users.email)
            return users.email 
        } else {
            return false
        }
    }
    module.exports.checkEmail = checkEmail

    // check if email and password match for login
    async function checkAuth(email, pass) {
        let users = await User.findOne({email: email})
        if (email === users.email && pass === users.password) {
            return true
        } else {
            return false
        }
    }
    module.exports.checkAuth = checkAuth

    // delete user by user id
    async function deleteUser(id) {
        User.deleteOne({_id: id}, function(err, obj) {
            if (err) throw err;
        })
    }
    module.exports.deleteUser = deleteUser

    // returns all todos for given user
    async function getTodoAll(id) {
        let users = await User.findOne({_id: id}).lean()
        let db = users.todo
        if (users !== null) {
            return db
        } else {
            return false
        }
    }
    module.exports.getTodoAll = getTodoAll

    // create a TO_DO for a given user ID, and add TO_DO to users TO_DO list in the database
    async function createTodo(id, title, dates) {
        const time = moment(Date.now()).format('DD/MM HH:mm:ss')
        let users = await User.findOne({_id: id})
        let todos = users.todo
        let obj = {_id: new ObjectID(), title: title, dueDate: dates, time: time}
        todos.push(obj)
        User.updateOne({_id: id}, {todo: todos}, function(err, obj) {
            if (err) throw err;
        })
    }
    module.exports.createTodo = createTodo

    // delete a TO_DO for a given user ID, and delete TO_DO from users TO_DO list in the database
    async function deleteTodo(id, idTodo) {
        let users = await User.findOne({_id: id})
        let arr = users.todo
        arr = arr.filter(item => item._id != idTodo)
        User.updateOne({_id: id}, { todo: arr }, function(err, obj) {
            if (err) throw err;
        })
    }
    module.exports.deleteTodo = deleteTodo

    // update a TO_DO for a given user ID, and update TO_DO from users TO_DO list in the database
    async function editTodo(id, idTodo, title, dates) {
        let users = await User.findOne({_id: id})  // find user by id
        let arr = users.todo // get user's todo list
        let index = arr.findIndex(x => x._id == idTodo) // find index of TO_DO to be edited
        arr[index].title = title // update title
        arr[index].dueDate = dates // update due date
        User.updateOne({_id: id}, { todo: arr }, function(err, obj) { // update user's TO_DO list in the database
            if (err) throw err;
        })
    }
    module.exports.editTodo = editTodo