const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 6700;
const MONGODB_URI = 'mongodb+srv://haris:haris123@node-api.3jdt3vm.mongodb.net/';
mongoose.connect(MONGODB_URI);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

});

const dataSchema = new mongoose.Schema({

  message: String,

});


const Data = mongoose.model('Data', dataSchema);

app.get('/hello', async (req, res) => {

  try {

    const result = await Data.findOne({ message: 'Hello, World!' });

    if (!result) {

      const newData = new Data({ message: 'Hello, World!' });

      await newData.save();

      res.send(newData.message);

    } else {

      res.send(result.message);

    }

  } catch (err) {

    console.error('Error retrieving data from MongoDB:', err);

    res.status(500).send('Error retrieving data from MongoDB');

  }

});




app.listen(port, () => {

  console.log(`Server running on port ${port}`);
  console.log('hello, backend')
});


