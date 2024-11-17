interface BadRequestError{
    statusCode: number
}

class BadRequestError extends Error implements BadRequestError {
    constructor(message:string) {
      super(message);
      this.statusCode = 400;
    }
}

export default BadRequestError