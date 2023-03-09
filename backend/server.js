const app = require('./app');

const dotenv = require('dotenv');
const cloudinary = require("cloudinary");

const connectDatabase = require('./config/database');
//handling uncaught exceptions
process.on("uncaughtException", (err) => {
	console.log(`Error: ${err.message}`);
	console.log("Shutting down the server due to Uncaught Exception");
	process.exit(1);
});



//config
dotenv.config({ path: "backend/config.env" });
const port = process.env.PORT || 4000;

//connecting to database
connectDatabase();

cloudinary.config({
	cloud_name: "dgeybjeqs",
	api_key: "178282191558813",
	api_secret:"IoXx9Ro9C4CF7c1LL30UbkepuKw",
})


app.listen(port, () => {
	console.log(`server is running at port number ${port}`);
});



//Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
	console.log(`Error: ${err.message}`);
	console.log(`Shutting down the server due to Unhandled Promise Rejection`);
  
	server.close(() => {
	  process.exit(1);
	});
  });
  