import { Request, Response } from 'express';

export const rootHandler = (_req: Request, res: Response) => {
  return res.send('We have lift off. Api is working.');
};
