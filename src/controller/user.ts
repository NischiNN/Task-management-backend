import { Request, Response } from 'express';
import UserService from '../service/User';
import BaseController from './base';

export default class UserController extends BaseController {
  static signup = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    try {
      const user = await UserService.signup(name, email, password);
      BaseController.sendHttpResponse(res, 'Success', user);
    } catch (err: any) {
      BaseController.sendErrorResponse(res, err);
    }
  };

  static login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
      const result = await UserService.login(email, password, res);
      BaseController.sendHttpResponse(res, 'Success', result.user);
    } catch (err: any) {
      BaseController.sendErrorResponse(res, err);
    }
  };

  static getUser = async (req: Request, res: Response) => {
    try {
      const user = await UserService.getUser(req['userId']);
      BaseController.sendHttpResponse(res, 'Success', user);
    } catch (err: any) {
      BaseController.sendErrorResponse(res, err);
    }
  };
}
