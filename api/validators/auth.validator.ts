import Joi from "joi";

export const companyRegisterSchema = Joi.object({
  companyName: Joi.string().min(4).max(40).trim().required().messages({
    "string:empty": "Company name is required",
    "string:min": "Company name is at least 4 characters long",
    "string:max": "Company name should not exceed limit of 40 characters"
  }),
  companyType: Joi.string().min(3).max(20).required().messages({
    "string:empty": "Company type is required",
    "string:min": "Company type is at least 3 characters long",
    "string:max": "Company type should not exceed limit of 20 characters"
  }),
  companyEmail: Joi.string().min(8).max(30).trim().required().messages({
    "string:empty": "Company email is required",
    "string:min": "Company email is at least 8 characters long",
    "string:max": "Company email should not exceed limit of 30 characters"
  }),
  companyContact: Joi.number().min(10).max(15).required().messages({
    "number:empty": "Company contact is required",
    "number:min": "Company contact is at least 10 numbers long",
    "number:max": "Company contact should not exceed limit of 15 characters"
  })
});