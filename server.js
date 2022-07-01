const express = require("express");
const bodyParser = require("body-parser");
const api = require("./src/api");

const app = express();
const PORT = 8080;

app.use(bodyParser.json());
app.use('/api' , api);

app.listen(PORT , () => {
    console.log(`App listening on port ${PORT}`);
})