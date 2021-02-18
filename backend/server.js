import express from "express";
import dotenv from "dotenv";
import colors from "colors";


dotenv.config();

// run connect to DB function here

const app = express();

app.use(express.json());

/* 
define routes and controller methods here

*/

app.get("/", (req, res) => {
  res.status(200).json({ message: "API is running :)" });
});

const PORT = process.env.PORT || 5000;

const start = async (req, res) => {
  try {
    app.listen(PORT, () => {
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.yellow.bold`;
    });
  } catch (e) {
    console.error(e);
  }
};
