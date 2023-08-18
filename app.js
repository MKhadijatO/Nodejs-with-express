const fs = require('fs');


// IMPORT PACKAGE
const express = require ('express');
let app = express();

// ROUTE = HTTP METHOD + URL
const html = fs.readFileSync('./Files/index.html', 'utf-8');

app.get('/', (req, res) => {
    res.status(200).send(html);
})

//post request
// app.post('/', () => {
   
// })



// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


