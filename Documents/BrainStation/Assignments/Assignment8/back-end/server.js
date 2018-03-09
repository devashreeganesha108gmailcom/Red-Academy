
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8080
const fs = require('fs');

const knex = require('knex')({
  client: 'postgres',
  connection: {
    host     : '127.0.0.1',
    user     : '',
    password : '',
    database : 'devashishshrestha1',
    charset  : 'utf8'
  }
});

const bookshelf = require('bookshelf')(knex);
const Task = bookshelf.Model.extend({
    tableName: 'todolist', 
})


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/create', (req, res) => {
    console.log('create')
    let newTask = new Task({
        id: req.body.id,
        task: req.body.task,
        checked: req.body.checked,
    }, {
        method :'insert'
    })
    
    newTask.save(null, { method: 'insert' });
    newTask.save()
    .then(task => {
        console.log(task.attributes)
    }).catch(error =>{
        console.log(error)
    })
    res.json(req.body)
})

app.put('/setmarked', (req, res)=>{
    knex("todolist").where("id", req.body.id)
        .update({ checked : req.body.checkedCondition }).then(count => {
            console.log('items marked',count)
        })
})

app.delete('/deleteindividualitems', (req, res) => {
    knex("todolist").where("id", req.query.id).del().then(function (result) {
        console.log('deleted item',result);
    })
})

app.delete('/delete', (req, res) => {
    console.log('deletecheckeditems')
    knex("todolist").where("checked", true).del().then(result =>{
        console.log('deleted items',result)
    })
})

app.get('/get', (req, res) => {
    knex.select("*").from("todolist").then(function (values, err) {
        if (err) {
            console.log(err);
        } else {
            res.json(values)
        }
    })
})


app.listen(port, () => { console.log(`Back End Server Running at Port ${port}`) })