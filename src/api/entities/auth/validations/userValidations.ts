import Joi from "joi";

const signUpSchema = Joi.object({
    email:Joi.string().email().required(),
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
 });

 const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().min(4).required(),
 });

export { loginSchema,signUpSchema}