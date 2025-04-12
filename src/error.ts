class APIError extends Error {
  readonly userMessage: string
  readonly className: string
  readonly statusCode: number

  constructor(
    message: string,
    userMessage: string,
    statusCode: number,
    className: string
  ) {
    super()
    this.userMessage = userMessage
    this.message = message
    this.statusCode = statusCode
    this.className = className
  }
}

export default APIError
