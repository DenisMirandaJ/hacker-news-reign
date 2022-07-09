class NotFoundException extends Error {}
class InvalidCredentialsException extends Error {}

const BussinessExceptions = {
  NotFoundException,
  InvalidCredentialsException,
};

export default BussinessExceptions;
