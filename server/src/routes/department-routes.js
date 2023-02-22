import { Router } from "express";

import { db } from "../index.js";
import { modifyDepartmentSchema } from "../validators/departments.js";
import { parseErrors } from "../utils/error-parser.js";

const departmentsRouter = Router();

departmentsRouter.get("/", async (req, res) => {
  try {
    const departments = await db.any(
      "SELECT department_id,name FROM departments"
    );
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
    await db.none("INSERT INTO departments(name) VALUES($1)", [req.body.name]);
    res.status(200).redirect("/departments");
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
    await db.none("UPDATE departments SET name = $1 WHERE department_id = $2", [
      req.body.name,
      req.params.departmentId,
    ]);
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

departmentsRouter.delete("/delete/:departmentId", async (req, res) => {
  try {
    const department = await db.one(
      "SELECT department_id FROM departments WHERE department_id = $1",
      [req.params.departmentId]
    );
    if (!department) {
      res.status(400).send("Department is not exist");
      return;
    }
    await db.none("DELETE FROM employees WHERE department_id = $1", [
      req.params.departmentId,
    ]);
    await db.none("DELETE FROM departments WHERE department_id = $1", [
      req.params.departmentId,
    ]);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

departmentsRouter.get("/:departmentId", async (req, res) => {
  try {
    const departments = await db.any(
      `SELECT department_id,name FROM departments WHERE department_id = $1`,
      [req.params.departmentId]
    );
    res.json(departments);
  } catch (e) {
    console.log(e);
  }
});

export default departmentsRouter;
