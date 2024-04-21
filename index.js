require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose')
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log("Server Listening on PORT:", PORT);
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });

app.get("/status", (request, response) => {
    const status = {
        "Status": "Jalan"
    };

    response.send(status);
});

const UserRoute = require("./routes/user");
//const orderRouter = require("./routes/order");

app.use("/routes", UserRoute);
//app.use("/api/orders", orderRouter);

