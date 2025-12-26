import { Request, Response } from 'express';
import handleResponse from '../services/handleResponse.service';
import Company from '../models/company.model';
import { hashPassword } from '../services/bcrypt.service';
import User from '../models/user.model';
import redisConnection from '../config/redis.config';

export const authInit = async (req: Request, res: Response) => {
  try{
    const {
      companyName, companyType, companyGSTnumber, companyAdmin, companyContact, companyEmail, companyPassword
    } = req.body;

    const find = await Company.findOne({ 
      companyName, companyEmail, companyGSTnumber, isActive: true 
    }).lean();

    if(find) return handleResponse(res, 400, "Company already exist");

    const hash = await hashPassword(companyPassword, 10);

    const company = await Company.create({
      companyName, companyType, companyGSTnumber, companyEmail,
      companyAdmin, companyPassword: String(hash), companyContact
    });

    await User.create({
      name: companyAdmin, email: companyEmail, password: String(hash),
      role: 'Admin', employeeId: 'EMP-001', phone: companyContact,
      company: company._id
    });

    const otp = 123456;
    await redisConnection.set(`verification:${company._id}`, otp, "EX", 180);

    return handleResponse(res, 200, "Account created");
  }
  catch(error) {
    console.error(`Error in auth init: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const signIn = (req: Request, res: Response) => {
  try{

  }
  catch(error) {
    console.error(`Error in sign in: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const verify = (req: Request, res: Response) => {
  try{

  }
  catch(error) {
    console.error(`Error in verify: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const forgotPassword = (req: Request, res: Response) => {
  try{

  }
  catch(error) {
    console.error(`Error in forgot password: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const resetPassword = (req: Request, res: Response) => {
  try{

  }
  catch(error) {
    console.error(`Error in reset password: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};