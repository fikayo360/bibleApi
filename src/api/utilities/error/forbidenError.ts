interface ForbidenError{
    statusCode: number
}

class ForbidenError extends Error implements ForbidenError {
    constructor(message:string) {
      super(message);
      this.statusCode = 403;
    }
}

export default ForbidenError