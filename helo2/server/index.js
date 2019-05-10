const express = require("express");
const app = express();
const massive = require("massive");
const session = require("express-session");
const controller = require("./controller");
require("dotenv").config();

const {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

massive(CONNECTION_STRING).then(dbInstance => {
    app.set("db", dbInstance);
    console.log("db is connected")
    
});

app.post("/api/login", controller.logIn)

app.listen(SERVER_PORT || 4000, () => console.log(`Connected to ${SERVER_PORT}`));