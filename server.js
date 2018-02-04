const express=require('express')
const bodyparser=require('body-parser')
const MongoClient=require('mongodb').MongoClient
var app=express();
var db
var http=require('http')
app.use(bodyparser.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(bodyparser.json())
app.set('view engine', 'ejs',(req,res)=>{
	res.render(view, locals)
})

MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
if(err) return console.log(err)
	db = client.db('mydbtest') // whatever your database name is
})

app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    // renders index.ejs
    res.render('index.ejs', {quotes: result})
  })
})	

app.post('/quotes',(req,res) =>{	
	db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)    
    console.log('saved to database')
    res.redirect('/')
  })
})

app.put('/quotes', (req, res) => {
  db.collection('quotes')
  .findOneAndUpdate({name: 'Yoda'}, {
    $set: {
      name: req.body.name,
      quote: req.body.quote
    }
  }, {
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
  fetch({ /* request */ })
.then(res => {
  if (res.ok) return res.json()
})
.then(data => {
  console.log(data)
  window.location.reload(true)
})
})

app.listen(3000,function()
{
	console.log('Listening port no. 3000')	
})