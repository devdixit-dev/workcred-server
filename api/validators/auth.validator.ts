import Joi from "joi";

const companyRegister = Joi.object({
  name: Joi.string().min(4).max(44).required()
});