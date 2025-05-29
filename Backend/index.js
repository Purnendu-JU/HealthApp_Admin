require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const mongoURI = process.env.MONGO_URL;

const app = express();
const port = process.env.PORT;

async function main() {
  await mongoose.connect(mongoURI);
  console.log("Connected to Mongo");
}
main();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/files", express.static("files"));
app.use(express.json());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/product'));
app.use('/api/view', require('./routes/orders'));
app.use('/api/review', require('./routes/review'));
app.listen(port, () => {
  console.log(`Listening at port ${port}`);
});
