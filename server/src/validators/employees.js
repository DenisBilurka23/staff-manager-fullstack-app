import Schema from "validate";

export const modifyEmployeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    length: { min: 3, max: 32 },
  },
  age: {
    type: Number,
    required: true,
    size: { min: 18, max: 100 },
  },
  salary: {
    type: Number,
    required: true,
    size: { min: 0, max: 1000000 },
  },
  departmentId: {
    type: Number,
    required: true,
  },
});
