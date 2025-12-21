import {Request, Response} from 'express';
import handleResponse from '../services/handleResponse.service';

export const authInit = (req: Request, res: Response) => {
  try{
    
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