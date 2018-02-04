const express=require('express')
const bodyparser=require('body-parser')
const MongoClient=require('mongodb').MongoClient
var app=express();
var db
var http=require('http')
app.use(bodyparser.urlencoded({extended:true}))



MongoClient.connect('mongodb://localhost:27017/', (err, client) => {
if(err) return console.log(err)
	db = client.db('mydbtest') // whatever your database name is
})

app.get('/',(req,res,next) =>{
	res.sendFile(__dirname +'/index.html')
	// Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/administrator/Document/' for this app.
})
// // app.get('/quotes',function(req,res,next){
	// // res.setheader("content-type","text/html");
	// // res.sendfile(__dirname +'/index.html')
// // })
app.get('/thanks',(req,res,next) =>{
	res.send('Thanks for posting a new quote.')
	// Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/administrator/Document/' for this app.
})
app.post('/quotes',(req,res,next) =>{
	res.setHeader("Content-type","text/html");
	db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    
    console.log('saved to database')
	res.redirect('/thanks')
   // res.send('saved to database')
  })
})

app.listen(3000,function()
{
	console.log('Listening port no. 3000')	
})