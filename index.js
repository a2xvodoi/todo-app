const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./config/db');
const Todo = require('./models/todo');
const port = process.env.PORT || 8000;

app.set('views','views');
app.set('view engine','ejs');
app.use(express.static('./public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

db.connect();

app.get('/', (req, res)=>{
    res.render('index');
});
app.get('/api/todo', (req, res) =>{
    Todo.find({}).sort({updatedAt: -1})
    .then(data =>{
        res.json({listTodo: data});
    })
    .catch(() =>{
        res.json({err: 'Lỗi lấy dữ liệu'});
    })
});

app.post('/api/todo/create', (req, res) =>{
    const todo = new Todo(req.body);
    todo.save()
    .then(() =>{
        res.json({status: true});
    })
    .catch(() =>{
        res.json({status: false});
    })
})

app.put('/api/todo/edit', (req, res) =>{
    Todo.updateOne({_id: req.body}, req.body)
    .then(() =>{
        res.json({status: true});
    })
    .catch(() =>{
        res.json({status: false});
    })
})
app.delete('/api/todo/delete', (req, res) =>{
    Todo.deleteOne({_id: req.body._id})
    .then(() =>{
        res.json({status: true});
    })
    .catch(() =>{
        res.json({status: false});
    })
})
app.listen(port, () =>{
    console.log(`Server is running on port: http://localhost:${port}`);
})