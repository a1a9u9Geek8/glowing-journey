
const express = require("express");
// create db using express
const app = express();
app.use(express.json()); // middleware
import cors from "cors";
app.use(cors()); // middleware
import fs from "fs"; 
import {readdirSync } from 'fs';
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
app.use(cookieParser());
app.use(morgan("dev")); // middleware
require("dotenv").config();


const csrfProtection = csrf({cookie: true});

const port = process.env.PORT
app.listen(port, () => console.log(`Server is running on port ${port}`));

const { ClientEncryption } = require('mongodb-client-encryption');
const { MongoClient } = require("mongodb");
 
// Replace the following with your Atlas connection string                                                                                                                                        
const url = process.env.DATABASE_URI;
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const client = new MongoClient(url);
async function run() {
    try {
        await client.connect();
        console.log("Connected correctly to server");
    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);


//db connection string


// mongoose.connect(process.env.DATABASE_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true

// })
// .then(() => console.log("**MongoDB connection established.**"))
// .catch((err) => console.log("MongoDB connection failed => ", err));


//applying middlewares
//app.use(fs());
// app.use(cors());
// app.use(express.json());
// app.use(morgan("dev"));
//app.use((req, res, next) => {
  //  console.log("this is my middleware");
    //next();
//});

// setting up route
fs.readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

// applying csrf protection
app.use(csrfProtection);

app.get("/api/csrf-token", (req, res) => {
    res.json({csrfToken: req.csrfToken()});
    
});


