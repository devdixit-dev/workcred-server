import { Request, Response, NextFunction } from 'express';
import handleResponse from '../services/handleResponse.service';

import { verifyJwt } from '../utils/jwt.util';

import User from '../models/user.model';

const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const id = req.cookies.a_token;
    if(!id) return handleResponse(res, 403, "Forbidden request");

    const decoded = verifyJwt(id);
    if(!decoded || typeof decoded === 'string') return handleResponse(res, 401, "Unauthorized");

    const user = await User.findById(decoded?.id).select('_id email company role').lean();
    if(!user || !user.isActive || !user.isVerified) return handleResponse(res, 404, "User not found or verified");

    (req as any).user = user;
    next();
  }
  catch(error) {
    console.error(`Error in auth middleware: ${error}`);
    handleResponse(res, 500, "Internal server error");
  }
}

export default isAuthenticated;