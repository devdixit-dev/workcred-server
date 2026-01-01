import { Request, Response } from 'express';
import handleResponse from '../services/handleResponse.service';
import Company from '../models/company.model';
import { hashPassword } from '../services/bcrypt.service';
import User from '../models/user.model';
import redisConnection from '../config/redis.config';
import { encodeJwt, verifyJwt } from '../utils/jwt.util';
import emailQueue from '../queues/email.queue';

export const authInit = async (req: Request, res: Response) => {
  try {
    const {
      companyName, companyType, companyGSTnumber, companyAdmin,
      companyContact, companyEmail, companyPassword
    } = req.body;

    const find = await Company.findOne({
      companyName, companyEmail, companyGSTnumber, isActive: true
    }).lean();

    if (find) return handleResponse(res, 400, "Company already exist");

    const hash = await hashPassword(companyPassword, 10);

    const company = await Company.create({
      companyName, companyType, companyGSTnumber, companyEmail,
      companyAdmin, companyContact
    });

    const createEmpID = `EMP-0${company.employees.length}`;

    await User.create({
      name: companyAdmin, email: companyEmail, password: String(hash),
      role: 'Admin', employeeId: createEmpID, phone: companyContact,
      company: company._id, isActive: false
    });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisConnection.set(`verification:${company._id}`, otp, "EX", 120);

    await emailQueue.add(
      'email:verification',
      { 
        to: companyEmail, 
        subject: 'Verification Mail - WorkCred Inc.', 
        text: `Welcome ${companyAdmin} to WorkCred Incorporation\nYour verification otp is ${otp}. Verify your account to login in your account. This otp is expired after 2 min`
      }
    );

    const payload = { id: company._id };
    const token = encodeJwt(payload);

    res.cookie('v_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'lax',
      maxAge: 10 * 60 * 1000 // 10 min expiry
    });

    return handleResponse(res, 200, "Account created");
  }
  catch (error) {
    console.error(`Error in auth init: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const verify = async (req: Request, res: Response) => {
  try {
    const { otp } = req.body;
    if (!otp) return handleResponse(res, 400, "OTP is required");

    const token = req.cookies.v_token;
    if (!token) return handleResponse(res, 401, "Unauthrised access denied");

    const decoded = verifyJwt(token);
    if (!decoded) return handleResponse(res, 403, "Invalid token");

    const storedOTP = await redisConnection.get(`verification:${decoded?.id}`);
    if (!storedOTP || otp !== storedOTP) return handleResponse(res, 400, "OTP is invalid or expired");

    let filter = {
      isActive: true,
      isVerified: true
    }

    const company = await Company.findByIdAndUpdate(
      decoded?.id,
      filter,
      { new: true }
    );

    if (!company) return handleResponse(res, 404, "Company not found");

    await User.findOneAndUpdate(
      { name: company.companyAdmin },
      filter,
      { new: true }
    );

    res.clearCookie('v_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'development',
      sameSite: 'lax'
    });

    return handleResponse(res, 200, "Company and Admin both verified");
  }
  catch (error) {
    console.error(`Error in verify: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const resendEmailVerification = async (req: Request, res: Response) => {
  try{
    const token = req.cookies.v_token;
    if (!token) return handleResponse(res, 401, "Unauthrised access denied");

    const decoded = verifyJwt(token);
    if (!decoded) return handleResponse(res, 403, "Invalid token");

    const company = await Company.findById(decoded.id);
    if(!company) return handleResponse(res, 404, "User not found");

    if(company.isActive && company.isVerified) {
      return handleResponse(res, 200, "Your account is already verified");
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await redisConnection.set(`verification:${company._id}`, otp, "EX", 120);

    await emailQueue.add(
      'email:verification',
      { 
        to: company.companyEmail, 
        subject: 'Verification Mail - WorkCred Inc.', 
        text: `Your verification otp is ${otp}. Verify your account to login in your account. This otp is expired after 2 min`
      }
    );

    return handleResponse(res, 200, "Verification code sent successfully");
  }
  catch(error) {
    console.error(`Error in resending verification email: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
}

export const signIn = (req: Request, res: Response) => {
  try {

  }
  catch (error) {
    console.error(`Error in sign in: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const forgotPassword = (req: Request, res: Response) => {
  try {

  }
  catch (error) {
    console.error(`Error in forgot password: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};

export const resetPassword = (req: Request, res: Response) => {
  try {

  }
  catch (error) {
    console.error(`Error in reset password: ${error}`);
    return handleResponse(res, 500, "Internal server error");
  }
};