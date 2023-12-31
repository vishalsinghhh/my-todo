require("express-async-errors");
const express = require("express");
const sequelize = require("sequelize");
const dotenv = require("dotenv").config();
const db = require("./Models");
// cors
const corsMiddleware = require("./cors");
const app = express();
app.use(corsMiddleware);
const morgan = require("morgan");
// routes
const authRouter = require("./routes/authRoute");
const listRouter = require("./Routes/listRoute.js")
const taskRouter = require("./Routes/taskRoute.js")
// middleware
const notFoundMiddleware = require("./Middleware/not-found.js")
const errorHandlerMiddleware = require("./Middleware/error-handler.js")

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
  res.send("My Todo");
});

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/list", listRouter); 
app.use("/api/v1/task", taskRouter); 

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

db.sequelize.sync({ force: true }).then(() => {
  console.log("db has been re sync");
});

const start = () => {
    try {
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
  
};

start();
