import { defaultServerError } from "./error-message";
import { ResponseContract } from "@ioc:Adonis/Core/Response";

export type DefaultMessageType = {
  message: string;
};
const httpStatusCode = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500,
  CONFLICT: 409,
};
export const successResponse = <T>(res: ResponseContract, body: T) => {
  return res.status(httpStatusCode.OK).send(body);
};

export const createdResponse = <T>(res: ResponseContract, body: T) => {
  return res.status(httpStatusCode.CREATED).send(body);
};

export const notAllowed = (res: ResponseContract, errorMessage: string) => {
  return res.status(httpStatusCode.FORBIDDEN).send(errorMessage);
};

export const badRequestResponse = (
  res: ResponseContract,
  errorMessage: string
) => {
  return res.status(httpStatusCode.BAD_REQUEST).send({ error: errorMessage });
};
export const confictResponse = (
  res: ResponseContract,
  errorMessage: string
) => {
  return res.status(httpStatusCode.CONFLICT).send({ error: errorMessage });
};
export const serverErrorResponse = (res: ResponseContract) => {
  return res
    .status(httpStatusCode.INTERNAL_SERVER_ERROR)
    .send({ error: defaultServerError() });
};
