
import express from "express";
import productRouter from "../src/routes/product";
import authRouter from "../src/routes/auth";
import mongoose from "mongoose";

const app = express();

//đăng ký middleware" giải mã dữ liệu json
app.use(express.json())

// router
app.use("/api",productRouter);
app.use("/api", authRouter);
    
mongoose.connect("mongodb://127.0.0.1:27017/we17302");

export const viteNodeApp = app;

