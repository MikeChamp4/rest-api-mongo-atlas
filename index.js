const app = require('./app.js');
const mongoose = require('mongoose')

const dotenv = require('dotenv');
require('dotenv').config();
const { DB_URL, DB_USER, DB_PASSWORD } = process.env;

const urlMongodb = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_URL}`;

const port = 3000;

mongoose.connect(urlMongodb, 
    ).then(() => {

        console.log('\n------------ Database -------------');
        console.log("DB is connected");
        console.log('-----------------------------------\n');
        
        app.listen(port, () => {
            console.log('\n------------ Server ---------------');
            console.log(`Server in port: ${port}`);
            console.log(`URL: http://localhost:${port}`);
            console.log('-----------------------------------\n');
            
            console.log('\n-------- Server Responses ---------');
        });
    })
    .catch((error) => {
        console.log(error);
    });