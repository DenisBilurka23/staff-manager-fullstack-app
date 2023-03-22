import express from "express";
import url from "url";
import session from "express-session";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";

import employeesRouter from "./routes/employee-routes.js";
import usersRouter from "./routes/users-routes.js";
import authRouter from "./routes/auth-routes.js";
import departmentsRouter from "./routes/department-routes.js";
import cookieParser from "cookie-parser";
import { authMiddleware } from "./utils/auth-helpers.js";

const app = express();
const bodyParserUrlencoded = express.urlencoded({ extended: false });
const bodyParserJson = express.json();
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200,
  credentials: true,
};

global.__basepath = __dirname;

dotenv.config();
app.use(cookieParser());
app.use(bodyParserUrlencoded);
app.use(bodyParserJson);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors(corsOptions));
//

app.use("/employees", authMiddleware, employeesRouter);
app.use("/users", authMiddleware, usersRouter);
app.use("/departments", authMiddleware, departmentsRouter);
app.use("/", authRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is started on port ${process.env.PORT}`);
});
