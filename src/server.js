const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const createRoutes = require("./routes");

const PORT = config.get("port") || 5000;
const DB = config.get("database");
const mongoUri = config.get("mongoUri");

const app = express();

createRoutes(app);

function startServer() {
  try {
    mongoose.connect(
      `${mongoUri}/${DB}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      },
      (err) => {
        if (err) {
          throw Error(err);
        } else console.log(`Connected to Mongodb database:  ${DB}`);
      }
    );
    app.listen(PORT, () => {
      console.log(`> Server started on ${PORT} port`);
    });
  } catch (e) {
    console.log("Server error", e.message);
    process.exit(1);
  }
}

startServer();
