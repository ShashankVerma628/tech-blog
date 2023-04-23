import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import path from "path";

// db
import connectDB from "./db/connect.js";

// routes
import homeRouter from "./routes/home-route.js";
import authRouter from "./routes/auth-route.js";
import dashRouter from "./routes/dash-route.js";

// middleware
import notFoundMiddleware from "./middleware/not-found.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import authenticateUser from "./middleware/auth.js";

app.use(express.json());

// Your code
if (process.env.NODE_ENV === "production") {
    const __dirname = path.resolve();
    console.log("bruh", __dirname);
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        });
    })
}
// Your code


app.use("/home", homeRouter);
app.use("/api/v1/auth", authRouter);
app.use("/dashboard", authenticateUser, dashRouter);

// error handler middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;
const start = async () => {
    try {
        app.listen(port, () => {
            console.log(`listening on port : ${port}`);
        });
        await connectDB(process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
    }

}

start();