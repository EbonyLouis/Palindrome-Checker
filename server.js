const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb+srv://ebonyjlouis:Butterfly12@palindrome-wjzio.mongodb.net/test?retryWrites=true&w=majority'
var db, collection;
const dbName = "palindrome";


app.listen(3000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req, res) => {
  //console.log(db)
  db.collection('palindrome').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {palindrome: result})
  })
})

app.post('/palindrome', (req, res) => {
  db.collection('palindrome').save({word: req.body.word}, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/')
  })
})
app.post('/api', (req,res) => {
    if('word' in params){
      if(params['word'].trim().toLowerCase() == params['word'].trim().toLowerCase().split('').reverse().join('')){
        res.writeHead(200, {'Content-Type': 'application/json'});
          let object = {
            prop: "true"
          }
        res.end(JSON.stringify(object));
      }
      else if(params['word'].trim().toLowerCase() !== params['word'].trim().toLowerCase().split('').reverse().join('')){
        res.writeHead(200, {'Content-Type': 'application/json'});
        object = {
          prop: "false",
        }
        res.end(JSON.stringify(object));
      }
    }
    res.redirect('/palindrome')
  })
