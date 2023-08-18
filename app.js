// IMPORT PACKAGE

const express = require ('express');
let app = express();

// ROUTE = HTTP METHOD + URL

app.get('/', (req, res) => {
    res.status(200).send('<h3>Hello from express server</h3>');
})



// CREATE A SERVER
const port = 3000;
app.listen(port, ()=> {
    console.log('server has started...')
});


