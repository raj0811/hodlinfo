const express = require('express');
const port = 8005;
const app = express();
const bodyParser = require('body-parser');

app.use(express.static('assets'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', require('./routes'));

app.listen(port, (err) => {
    if (err) {
        console.log(`Error in running the server: ${err}`);
    } else {
        console.log(`Server is running on port: ${port}`);
    }
});
