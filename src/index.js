const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const route = require("./routes/route.js");
const app = express();
const port = 4000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose
  .connect(
    "mongodb+srv://priya:priya1122@cluster0.zscq3.mongodb.net/group73Database", {
      useNewUrlParser: true,
    }
  )
  .then((result) => console.log("✅ MongoDb is connected"))
  .catch((err) => console.log('⚠️ ',err.message));

app.use("/", route);

app.listen(port, () => {
  console.log(`✅ Server is start on port ${port}`);
});