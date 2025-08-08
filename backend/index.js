import express from "express";
import dotenv from 'dotenv';
import cors from "cors"
import cookieParser from 'cookie-parser';
import authRouter from "./router/authRoute.js"
import financeRouter from "./router/financeRoute.js"
import {connectDB} from "./db/db.js"
import  path from "path"
dotenv.config()



const PORT = process.env.PORT || 5000
const app =express();

const __dirname = path.resolve();

app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? "/api":  process.env.FRONTEND_URL,
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth',authRouter);
app.use('/api/finance', financeRouter);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.get('/',(req,res)=>{
    res.send("Hello World")
})

connectDB();
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`)
})
