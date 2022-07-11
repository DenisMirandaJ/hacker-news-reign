class NotFoundException extends Error {}
class InvalidCredentialsException extends Error {}
class AuthTokenExpiredException extends Error {}
class UnauthorizedException extends Error {}
class ResourceUnavaliableException extends Error {}

const BussinessExceptions = {
  NotFoundException,
  InvalidCredentialsException,
  AuthTokenExpiredException,
  UnauthorizedException,
  ResourceUnavaliableException,
};

export default BussinessExceptions;
