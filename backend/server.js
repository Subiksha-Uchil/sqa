const app = require('./app');

const dotenv = require('dotenv');

const connectDatabase = require('./config/database')
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

app.listen(port, () => {
	console.log(`server is running at port number ${port}`);
});



//