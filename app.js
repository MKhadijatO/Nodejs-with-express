// IMPORT PACKAGE
const fs = require ('fs')
const express = require ('express');
let app = express();

// ROUTE = HTTP METHOD + URL

app.get('/api/v1/movies', (req, res) => {
    res.status(200).json(html);
})




// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


