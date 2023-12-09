require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const WayBillRoute = require("./src/routes/WayBillRoute");
const PackageRoute = require("./src/routes/PackageRoute");
const userRoute = require("./src/routes/userRoute");
const requireAuth = require("./src/middleware/requireAuth");
const router = express.Router();
// Express App

const app = express();

// midldeware
app.use(express.json());

// conect to mongodb
const dbURL =
  // "mongodb://localhost:27017//area:n5MEsrn46eh$2*D@nodetest.1oye0dr.mongodb.net/nodetest?retryWrites=true&w=majority";
  process.env.MONGO_URL;
mongoose
  .connect(dbURL)
  .then((result) => console.log("connected to db"))
  .catch((error) => console.log(error));

app.use(morgan("combined"));
// app.set("view engine", "ejs");

// server start
app.listen(process.env.PORT);

// routes
app.use(router.use(requireAuth));
app.use("/waybills", WayBillRoute);
app.use("/packages", PackageRoute);
app.use("/users", userRoute);
//404
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
