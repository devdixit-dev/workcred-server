import Joi from "joi";

export const companyRegisterSchema = Joi.object({
  companyName: Joi.string().min(4).max(40).trim().required().messages({
    "string:empty": "Company name is required",
    "string:min": "Company name is at least 4 characters long",
    "string:max": "Company name should not exceed limit of 40 characters"
  }),
  companyGSTnumber: Joi.string().min(10).max(16).trim().required().messages({
    "string:empty": "Company GST number is required",
    "string:min": "Company GST number is at least 10 characters long",
    "string:max": "Company GST number should not exceed limit of 16 characters"
  }),
  companyAdmin: Joi.string().min(4).max(16).trim().required().messages({
    "string:empty": "Company admin is required",
    "string:min": "Company admin is at least 10 characters long",
    "string:max": "Company admin should not exceed limit of 16 characters"
  }),
  companyPassword: Joi.string().min(8).max(24).trim().required().messages({
    "string:empty": "Company password is required",
    "string:min": "Company password is at least 8 characters long",
    "string:max": "Company password should not exceed limit of 24 characters"
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
  companyContact: Joi.string().min(10).required().messages({
    "string:empty": "Company contact is required",
    "string:min": "Company contact is at least 10 numbers long"
  })
});