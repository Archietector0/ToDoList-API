import { ApiError } from '../exceptions/api.error';

function logger(err, req, res, next) {
  console.log(err);
  return err instanceof ApiError
    ? res
        .status(err.getStatus())
        .json({ message: err.message, errors: err.getErrors() })
    : res.status(500).json({ message: `Unforeseen behavior: ${err.message}` });
}

export default logger;
