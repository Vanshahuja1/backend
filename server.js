// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const formRoutes = require('./routes/route');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api', formRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
