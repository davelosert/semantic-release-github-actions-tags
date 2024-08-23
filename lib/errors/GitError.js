import SemanticReleaseError from "@semantic-release/error";

class GitError extends SemanticReleaseError {
  constructor(originalError) {
    super(`Error while running git command: ${originalError.message}`);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.code = `EGITERROR`;
  }
}

export {
  GitError
};
