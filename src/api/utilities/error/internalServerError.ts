interface InternalServerError{
    statusCode: number
}

class InternalServerError extends Error implements InternalServerError {
    constructor(message:string) {
      super(message);
      this.statusCode = 500;
    }
}

export default InternalServerError