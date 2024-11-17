interface unAuthorizedError{
    statusCode: number
}

class unAuthorizedError extends Error implements unAuthorizedError {
    constructor(message:string) {
      super(message);
      this.statusCode = 401;
    }
}

export default unAuthorizedError