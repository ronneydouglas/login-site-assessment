const express = require ("express");
const mustacheExpress = require ("mustache-express");
const session = require ("express-session");
const bodyParser = require ("body-parser");
const validator = require("express-validator");
const path = require("path");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(validator());

app.engine("mustache", mustacheExpress());
app.set("views", "./views");
app.set("view engine", "mustache");

app.use(session( {
    secret: 'dirty',
    resave: false,
    saveUninitialized: false
}));

let users = [{username: "ronney", password: "password"}];
let messages = [];

app.get("/", function(req, res) {
   res.render("index");
});

app.get("/login", function(req, res) {
    res.render("login");
});

app.post("/login", function(req, res) {
    let loggedUser;
    messages = [];
     console.log("req.body:", req.body);


    users.forEach(function(user) {
        console.log("user:", user);
        if (user.username === req.body.username) {
            loggedUser = user;
        }
    });

    if (!loggedUser) {
        res.send("Unknown User" + req.body.username);
    }
        req.session.username = req.body.username;


    res.redirect("/");
});




app.listen(3000, function() {
    console.log("Hiya pal!");
});
