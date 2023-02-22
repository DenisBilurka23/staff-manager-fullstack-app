import { Router } from "express";

import { db } from "../index.js";
import { formatDataTime } from "../utils/data-formatter-helpers.js";
import { modifyEmployeeSchema } from "../validators/employees.js";
import { parseErrors } from "../utils/error-parser.js";

const employeesRouter = Router();

employeesRouter.get("/", async (req, res) => {
  try {
    const queryParam = req.query.department;
    const employees = await db.any(
      `SELECT employee_id,name,age,salary,department_id,date_created FROM employees ${
        queryParam ? `WHERE department_id = ${queryParam}` : ""
      }`
    );
    const sortedDate = formatDataTime(employees);
    res.json(sortedDate);
  } catch (e) {
    console.log(e);
  }
});

employeesRouter.post("/add", async (req, res) => {
  const validate = modifyEmployeeSchema.validate(req.body);
  console.log("validate:", validate);
  try {
    if (validate.length) {
      res.status(400).json(parseErrors(validate));
      return;
    }
    const updatedData = await db.one(
      "INSERT INTO employees(name,age,department_id,salary) VALUES($1,$2,$3,$4) RETURNING employee_id,name,age,department_id,salary;",
      [req.body.name, req.body.age, req.body.departmentId, req.body.salary]
    );
    res.status(200).json(updatedData);
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
    await db.none(
      "UPDATE employees SET name = $1,age = $2,department_id = $3,salary = $4 WHERE employee_id = $5",
      [
        req.body.name,
        req.body.age,
        req.body.departmentId,
        req.body.salary,
        req.params.employeeId,
      ]
    );
    res.sendStatus(200);
  } catch (e) {
    console.log(e);
    res.sendStatus(500);
  }
});

employeesRouter.delete("/delete/:employeeId", async (req, res) => {
  try {
    const employee = await db.one(
      "SELECT employee_id FROM employees WHERE employee_id = $1",
      [req.params.employeeId]
    );
    if (!employee) {
      res.status(400).send("Employee is not exist");
      return;
    }
    await db.none("DELETE FROM employees WHERE employee_id = $1", [
      req.params.employeeId,
    ]);
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

employeesRouter.get("/:employeeId", async (req, res) => {
  try {
    const employees = await db.any(
      `SELECT employee_id,name,age,salary,department_id FROM employees WHERE employee_id = $1`,
      [req.params.employeeId]
    );
    res.json(employees);
  } catch (e) {
    res.sendStatus(500);
    console.log(e);
  }
});

export default employeesRouter;
