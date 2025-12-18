import {Response} from 'express';

const handleResponse = (res: Response, status: number, message: string, data = null) => {
  res.status(status).json({
    status, message, data
  });
}

export default handleResponse;
