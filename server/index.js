import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import clientRoutes from "./routes/clientRouter.js";
import managementRoutes from "./routes/managementRouter.js";
import salesRoutes from "./routes/salesRouter.js";
import generalRoutes from "./routes/generalRouter.js";

// data imports
import User from "./models/User.js";
import Product from "./models/Product.js";
import ProductStat from "./models/ProductStat.js";
import { dataUser, dataProduct, dataProductStat } from "./data/index.js";

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE */
const PORT = process.env.PORT || 9000;

console.log(process.env.MONGO_URL);

(async function () {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(PORT, async () => {
      console.log(`Server port: ${PORT}`);

      /*
      ONLY ADD DATA ONE TIME

      await User.insertMany(dataUser);
      await Product.insertMany(dataProduct);
      await ProductStat.insertMany(dataProductStat);
      console.log("Data added");
      
      */
    });
  } catch (error) {
    console.log(error);
  }
})();
