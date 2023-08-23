const app = require('./app');




// CREATE A SERVER

const port = 3000;

app.listen(port, () => {
    console.log('server has started...');
})