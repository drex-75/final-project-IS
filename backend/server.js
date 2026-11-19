//const express= require("express");

import express from "express";
import helmet from "helmet"; 
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();

const app=express();
const PORT=process.env.PORT || 3000;

console.log(PORT);

app.use(express.json());
app.use(cors());
app.use(helmet()); // helmet es un middleware de seguridad para aplicaciones Express.
//  Ayuda a proteger la aplicación de algunas vulnerabilidades web conocidas al establecer varios encabezados 
// HTTP relacionados con la seguridad.
app.use(morgan("dev"));//hace el registro de las solicitudes
app.use("/api/products", productRoutes);

app.listen(PORT,()=>{
    console.log("Server is running on port "+PORT);
});
