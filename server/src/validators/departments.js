import Schema from "validate";

export const modifyDepartmentSchema = new Schema({
  name: {
    type: String,
    required: true,
    length: { min: 3, max: 32 },
  },
});
