// IMPORT PACKAGE
const express = require ('express');
let app = express();

// ROUTE = HTTP METHOD + URL

app.get('/', (req, res) => {
    res.status(200).json({greeting: 'Hello, friend', message: 'This is just an example'});
})

//post request
app.post('/', () => {
   
})



// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


