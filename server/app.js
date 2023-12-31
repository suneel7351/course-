import express from "express";
import { config } from "dotenv";
import courseRouter from "./routes/courseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import paymentRouter from "./routes/paymentRoutes.js";
import connection from "./config/db.js";
import errorMiddle from "./middleware/error.js";
import { fileURLToPath } from 'url';
import path from "path";
import cookieParser from "cookie-parser";
import router from "./routes/routes.js";
import cors from "cors";
config({ path: "./config/.env" });
connection();
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  express.urlencoded({
    //   The extended option allows to choose between parsing the URL-encoded data with the querystring library (when false ) or the qs library (when true ). The “extended” syntax allows for rich objects and arrays to be encoded into the URL-encoded format, allowing for a JSON-like experience with URL-encoded.
    extended: true,
  })
);

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use("/api/v1", userRouter);
app.use("/api/v2", courseRouter);
app.use("/api/v3", paymentRouter);
app.use("/api/v4", router);
export default app;




const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, '../client/build')));
console.log(process.env.WHATSAPP_SID,process.env.WHATSAPP_AUTH_TOKEN);
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build/index.html'));
});

app.use(errorMiddle);
