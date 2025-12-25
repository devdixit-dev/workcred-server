import { Request, Response, NextFunction } from "express";
import Joi from "joi";

export const Validate = (schema: Joi.ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body, { abortEarly: false });

  if(error) {
    const details = error.details.map((d) => d.message);
    res.status(400).json({
      success: false,
      message: "Validation Failed",
      errors: details
    });
    return;
  }

  next();
}