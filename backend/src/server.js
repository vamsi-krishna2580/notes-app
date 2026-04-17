import dotenv from "dotenv";
dotenv.config();
import express from "express";
import notesRouter from "./routes/notesRouter.js"
import { connectDB } from "./config/db.js";
//import rateLimiter from "./middleware/rateLimiter.js";
import AuthRouter from "./routes/AuthRouter.js"
import cors from "cors";
import { verifyUser } from "./middleware/auth.js";


const app = express();

const PORT  = process.env.PORT || 5000;

//middleware
app.use(express.json())  // middleware is function or method that executes on incoming request
app.use(cors());
app.use((req, res, next)=>{
    console.log(`Req method is ${req.method} & Req URL is ${req.url}\n`);
    next();
});
//app.use(rateLimiter);
app.use("/api/todos", notesRouter);
app.use("/api/auth", AuthRouter);

connectDB().then(()=>{
    app.listen(PORT, ()=>{
    console.log("Server started on port:", PORT);
});
 
});


