import { Router } from "express";

import { modifyEmployeeSchema } from "../validators/employees.js";
import { parseErrors } from "../utils/error-parser.js";
import models from "../../models/index.js";
import multer from "multer";
import path from "path";

const employeesRouter = Router();
const loadedModels = await models;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__basepath, "uploads")),
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`);
  },
});
const upload = multer({ storage });

const parseParams = (params) =>
  Object.entries(params).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]:
        key === "age" || key === "salary" || key === "departmentId"
          ? +value || null
          : value || null,
    }),
    {}
  );

employeesRouter.get("/", async (req, res) => {
  try {
    const employees = await loadedModels.Employee.findAll();
    res.json(employees);
  } catch (e) {
    console.log(e);
  }
});

employeesRouter.post("/add", upload.single("file"), async (req, res) => {
  const parsedParams = parseParams(req.body);
  const validate = modifyEmployeeSchema.validate(parsedParams);
  try {
    if (validate.length) {
      res.status(400).json(parseErrors(validate));
      return;
    }
    const employee = loadedModels.Employee.build(parsedParams);
    const employeeRes = await employee.save();
    res.status(200).json(employeeRes);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

employeesRouter.post("/edit/:employeeId", async (req, res) => {
  const validate = modifyEmployeeSchema.validate(req.body);
  try {
    if (validate.length) {
      res.status(400).json(parseErrors(validate));
      return;
    }
    await loadedModels.Employee.update(req.body, {
      where: {
        id: req.params.employeeId,
      },
    });

    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

employeesRouter.delete("/delete/:employeeId", async (req, res) => {
  try {
    const employee = loadedModels.Employee.findByPk(req.params.employeeId);
    if (!employee) {
      res.status(400).send("Employee is not exist");
      return;
    }
    await loadedModels.Employee.destroy({
      where: {
        id: req.params.employeeId,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

employeesRouter.get("/:employeeId", async (req, res) => {
  try {
    const employee = await loadedModels.Employee.findByPk(
      req.params.employeeId
    );
    res.json(employee);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

export default employeesRouter;
