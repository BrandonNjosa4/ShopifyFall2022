require('dotenv').config({path:__dirname+'/.env'});
require('express-async-errors');

const express = require('express')
const app = express()
app.use(express.json())

//import conect DB
const connectDB = require('./db/connect');

//import autheticate user 
const authenticateUser = require('./middleware/authentication');

//routers
const auth = require('./routes/auth');
const items = require('./routes/items')
const locations = require('./routes/locations')

//import middleware functions
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

const path = require('path');


//routes
app.use('/', auth)
app.use('/inventory', authenticateUser, items)
app.use('/location', authenticateUser, locations)

// deployment
__dirname=path.resolve()
if(process.env.NODE_ENV==='production') {
app.use(express.static(path.join(__dirname,'client/build')));

app.get('*', (req,res) => {
  res.sendFile(path.resolve(__dirname,'client','build','index.html'))
})
}

else {

}

//middleware functions 
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3500;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();