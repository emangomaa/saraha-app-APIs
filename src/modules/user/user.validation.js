import Joi from "joi";
const signUpSchema = Joi.object({
  name: Joi.string().min(3).max(15).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[0-9]{3,10}$/)
    .required(),
  age: Joi.number().min(20).max(50).required(),
});

const signInSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(/^[0-9]{3,10}$/)
    .required(),
});

export { signUpSchema, signInSchema };
