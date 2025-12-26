import { Request, Response } from 'express';
import handleResponse from '../services/handleResponse.service';
import Company from '../models/company.model';
import { hashPassword } from '../services/bcrypt.service';
import User from '../models/user.model';
import redisConnection from '../config/redis.config';
import { encodeJwt, verifyJwt } from '../utils/jwt.util';

export const authInit = async (req: Request, res: Response) => {
  try{
    const {
      companyName, companyType, companyGSTnumber, companyAdmin,
      companyContact, companyEmail, companyPassword
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

    const createEmpID = `EMP-0${company.employees.length}`;

    await User.create({
      name: companyAdmin, email: companyEmail, password: String(hash),
      role: 'Admin', employeeId: createEmpID, phone: companyContact,
      company: company._id
    });

    const otp = 123456;
    await redisConnection.set(`verification:${company._id}`, otp, "EX", 180);

    const payload = { id: company._id };
    const token = encodeJwt(payload);

    res.cookie('v_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'lax',
      maxAge: 3 * 60 * 1000 // 3 min expiry
    });

    return handleResponse(res, 200, "Account created");
  }
  catch(error) {
    console.error(`Error in auth init: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const verify = async (req: Request, res: Response) => {
  try{

    const token = req.cookies.v_token;
    const decoded = verifyJwt(token);

    const d = await redisConnection.get(`verification:${decoded?.id}`)

    res.json({
      data: d
    });
  }
  catch(error) {
    console.error(`Error in verify: ${error}`);
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