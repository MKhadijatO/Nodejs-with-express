const app = require('./app');

//console.log(app.get('env'));
console.log(process.env);


// CREATE A SERVER

const port = 3000;

app.listen(port, () => {
    console.log('server has started...');
})