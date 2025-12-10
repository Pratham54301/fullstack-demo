const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pageRoutes = require("./routes/pageRoutes");
const contractRoutes = require("./routes/contractRoutes");
const app = express();


app.use(cors());
app.use(express.json());


mongoose.connect("mongodb+srv://vedteic:Pratham%4054301@vedteix.yby9dng.mongodb.net/fullstacke")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.get("/", (req, res) => {
  res.send("Server is running");
});


app.use("/api/pages", pageRoutes);
app.use("/api/contracts", contractRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
