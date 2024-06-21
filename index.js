
 const express = require('express');
 const cookieParser = require('cookie-parser')
 const bodyParser = require('body-parser');

require('dotenv').config();  
const route =require('./config/routes')
const app = express();
require('./config/mongoose'); 
app.set('view engine', 'ejs') 
app.use(express.urlencoded({extended: true}))
app.use(route)

app.use(cookieParser())
const port = process.env.PORT || 4000;  // Provide a default value
app.use(bodyParser.json());
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
} );