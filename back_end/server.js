const express = require("express");
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const port = 8081;
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "kalam@96",
    database: "signup"
})

app.post('/login', (req, res) => {
    const sql = "SELECT * FROM login WHERE `email`=? AND `password`=?";
 
    db.query(sql, [req.body.email,req.body.password], (err, data) => {
        if (err) {
            // console.log(err);
            return res.json("Error")
        }
        if (data.length>0) {
            
            return res.json("Success")
        }
        else{
            console.log("here");
            return res.json("Failed")
        }
    })
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO login (`name`,`email`,`password`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password,
    ]
    
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error")
        }
        console.log(res.json(data));
        return res.json(data);
    })
})

app.post('/new-task', (req, res) => {
    console.log(req.body);
    const q  = 'insert into todos (task, createdAt, status) values (?, ?, ?)';
    db.query(q, [req.body.task, new Date(), 'inprogress'], (err, result) => {
        if(err){
            console.log('failed to store');
            
        }
        else{
            console.log('todo saved');
            const updatedTasks = 'select * from todos'
            db.query(updatedTasks, (error, newList) => {
                res.send(newList)
            })
            
        }
    })
    
})

app.get('/read-tasks', (req, res) => {
    const q = 'select * from todos';
    db.query(q, (err, result) => {
        if(err){
            console.log("failed to read tasks");
            
        }
        else{
            console.log("got tasks successfully from db");
            res.send(result)
            
            
        }
    })
})

app.post('/update-task', (req, res) => {
    console.log(req.body);
    const q = 'update todos set task = ? where id = ?'
    db.query(q, [req.body.task, req.body.updateId], (err, result) => {
        if(err) {
            console.log('failed to update');
            
        }
        else{
            console.log('updated');
            db.query('select* from todos', (e, r) => {
                if(e){
                    console.log(e);
                    
                }
                else{
                    res.send(r)
                }
            })
            
        }
    })
    
})

app.post('/delete-task', (req, res) => {
    const q = 'delete from todos where id = ?';
    db.query(q, [req.body.id], (err, result) => {
        if(err){
            console.log('Failed to delete');
            
        }else{
            console.log('Deleted successfully');
            db.query('select * from todos', (e, newList) => {
                res.send(newList);
            })
        }
    })
})

app.post('/complete-task', (req, res) => {
    console.log(req.body);
    
    const q = 'update todos set status = ? where id = ?'
    db.query(q, ['done', req.body.id], (err, result) => {
        if(result){

            
            db.query('select * from todos', (e, newList) => {
                res.send(newList)
            })
        }

    })
})



app.listen(port, () => console.log(`Example app listening on port ${port}!`))