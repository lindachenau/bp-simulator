require('dotenv').config({path: __dirname + '/.env'})
const express = require('express');
const appointments = require("./generate-slots");

const app = express();
app.use(require("body-parser").json());
app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); 

//Reminder email server
app.post('/get-appointments', async (req, res) => {
  try {
    const result = await appointments.generate(req);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({error: err});
  }
});

/*--------------------Routing Over----------------------------*/
const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Express Started on Port ${port}`);
});