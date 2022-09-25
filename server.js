const express = require('express')
const app = express()
const mongoClient = require('mongodb').MongoClient
const url = "mongodb+srv://root:root@cluster0.ivww0xw.mongodb.net/?retryWrites=true&w=majority"

const port = process.env.PORT || 5000

app.use(express.json())

app.use(function (req, res, next) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.listen(port)

app.get('/groups', (req, res) => {

    mongoClient.connect(url, async function(err, db) {
        if (err) throw err
        const database = db.db("Nationals")
        database.collection("Groups").find({}).toArray(function(err, result) {
          if (err) throw err;
          res.json(result)
          db.close();
        });
    });
})