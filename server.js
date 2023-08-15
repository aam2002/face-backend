const express = require("express");
const bcrypt = require("bcrypt-nodejs");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const knex = require("knex");
const register = require("./controllers/register");
const signin = require("./controllers/signin");
const profile = require("./controllers/profile");
const image = require("./controllers/image");
const postgres = knex({
  client: "pg",
  connection: {
    connectionString:process.env.DATABASE_URL,
    ssl:{rejectUnauthorized:false},
    host: process.env.DATABASE_HOST,
    port: 5432,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    database: process.env.DATABASE_DB,
  },
});

postgres.select("*").from("users");

app.use(cors());
app.use(bodyParser.json());
app.get('/',(req , res)=>{
  res.send('its working !!!')
})
app.post("/signin", (req, res) => {
  signin.handleSignin(req, res, postgres, bcrypt);
});
app.post("/register", (req, res) => {
  register.handleRegister(req, res, postgres, bcrypt);
});
app.get("/profile/:id", (req, res) => {
  profile.handleProfile(req, res, postgres);
});
app.put("/image", (req, res) => {
  image.handleImage(req, res, postgres);
});
app.listen(process.env.PORT || 3000, ()=> {
  console.log(`app is running on port ${process.env.PORT}`);
})