const mongoose = require('mongoose');

// const mongoURI= "mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false"
const mongoURI = "mongodb://localhost:27017/enotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

// const connectToMongo =async ()=>{
//     await mongoose.connect(mongoURI);
//     console.log("Connected to Mongoose")
// };

const connectToMongo =()=>{
     mongoose.connect(mongoURI, ()=>{
 console.log("Connected to Mongo") });  
}

module.exports= connectToMongo;