import { type Response } from 'express'
import type APIError from '../error'

class BaseController {
  protected static sendHttpResponse = (
    res: Response,
    message: string,
    data: object = {},
    headers: string[][] = [],
    statusCode: number = 200,
    success: boolean = true
  ): void => {
    headers.length > 0 &&
      headers.forEach((header) => {
        header.length > 0 && res.setHeader(header[0], header[1])
      })
    res.status(statusCode).json({ success, message, data })
  }

  protected static sendErrorResponse = (
    res: Response,
    error: APIError
  ): void => {
    console.log(error)
    res.status(error?.statusCode || 500).json({
      success: false,
      message: 'Error',
      data: {
        message: error?.userMessage || 'Internal error',
        details: error.message,
      },
    })
  }
}

export default BaseController
