import express from "express";
import path from "path";
import url from "url";
import session from "express-session";
import pgp from "pg-promise";
import cors from "cors";

import employeesRouter from "./routes/employee-routes.js";
import mainRouter from "./routes/main-routes.js";
import authRouter from "./routes/auth-routes.js";
// import { authMiddleware } from "./utils/auth-helpers.js";
import usersRouter from "./routes/user-routes.js";
import departmentsRouter from "./routes/department-routes.js";

const app = express();
const bodyParserUrlencoded = express.urlencoded({ extended: false });
const bodyParserJson = express.json();
const port = 8000;
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const connectionString = "postgres://localhost:5432/company";
export const db = pgp()(connectionString);
const corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const applyLocals = (req, res, next) => {
  res.locals.auth = !!req.session.user;
  next();
};

app.use(bodyParserUrlencoded);
app.use(bodyParserJson);
app.use("/public", express.static(path.join(__dirname, "static")));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(cors(corsOptions));
// app.use('/employees', authMiddleware, employeesRoutes)
// app.use('/content', authMiddleware, mainRouter)
app.use("/content", mainRouter);
app.use("/employees", employeesRouter);
app.use("/users", usersRouter);
app.use("/departments", departmentsRouter);
app.use("/", authRouter);
app.use(applyLocals);
app.use("/css", express.static(path.join("./node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join("./node_modules/bootstrap/dist/js")));
app.use("/js", express.static(path.join("./node_modules/jquery/dist")));

app.listen(port, () => {
  console.log(`Server is started on port ${port}`);
});
