import Schema from "validate";

export const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    length: { min: 3, max: 32 },
  },
  password: {
    type: String,
    required: true,
    length: { min: 3, max: 32 },
  },
});
