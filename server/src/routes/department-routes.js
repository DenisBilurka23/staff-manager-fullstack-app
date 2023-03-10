import { Router } from "express";

import { modifyDepartmentSchema } from "../validators/departments.js";
import { parseErrors } from "../utils/error-parser.js";

import models from "../../models/index.js";

const departmentsRouter = Router();
const loadedModels = await models;

departmentsRouter.get("/", async (req, res) => {
  try {
    const departments = await loadedModels.Department.findAll({
      include: {
        model: loadedModels.Employee,
        as: "employees",
      },
    });
    res.json(departments);
  } catch (e) {
    console.log(e);
  }
});

departmentsRouter.post("/add", async (req, res) => {
  const validate = modifyDepartmentSchema.validate(req.body);
  try {
    if (validate.length) {
      res.status(400).json(parseErrors(validate));
      return;
    }
    const department = loadedModels.Department.build(req.body);
    const departmentRes = await department.save();
    res.json(departmentRes);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

departmentsRouter.post("/edit/:departmentId", async (req, res) => {
  const validate = modifyDepartmentSchema.validate(req.body);
  try {
    if (validate.length) {
      res.status(400).json(parseErrors(validate));
      return;
    }
    await loadedModels.Department.update(req.body, {
      where: { id: req.params.departmentId },
    });
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

departmentsRouter.delete("/delete/:departmentId", async (req, res) => {
  try {
    const department = await loadedModels.Department.findByPk(
      req.params.departmentId
    );
    if (!department) {
      res.status(400).send("Department is not exist");
      return;
    }
    await loadedModels.Employee.destroy({
      where: {
        departmentId: req.params.departmentId,
      },
    });
    await loadedModels.Department.destroy({
      where: {
        id: req.params.departmentId,
      },
    });
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

departmentsRouter.get("/:departmentId", async (req, res) => {
  try {
    const department = await loadedModels.Department.findByPk(
      req.params.departmentId
    );
    res.json(department);
  } catch (e) {
    console.log(e);
  }
});

export default departmentsRouter;
