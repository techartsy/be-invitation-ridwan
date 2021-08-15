const express = require('express');
const cors = require('cors');
const app = express()
const router = require('./src/routes/admin.js')
const port = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/diesnatalis/invitation', router)

app.listen(port, () => console.log(`Your server running on ${port}`))