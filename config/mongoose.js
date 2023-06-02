const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/wazirx')
// mongoose.connect('mongodb+srv://mrunknown0086:GO5dV7jPxrBttQ43@cluster0.txtaext.mongodb.net/?retryWrites=true&w=majority');
//accuire the connectiontion
const db = mongoose.connection;


//error
db.on('error', console.error.bind(console, 'error in connecting to db'));

//up and runnning
db.once('open', function() {
    console.log("successfully connected to the database");
});