const express=require('express')
var app=express();

app.listen(3000,function()
{
	console.log('Listening port no. 3000')	
})

app.get('/',(req,res) =>{
	res.sendFile(__dirname +'/index.html')
	// Note: __dirname is directory that contains the JavaScript source code. Try logging it and see what you get!
  // Mine was '/Users/administrator/Document/' for this app.
})